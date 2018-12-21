package com.halitkorkmaz.datamining.service.Impl;

import com.halitkorkmaz.datamining.bean.dto.classification.ClassificationMethod;
import com.halitkorkmaz.datamining.bean.dto.classification.ClassificationResult;
import com.halitkorkmaz.datamining.bean.request.ClassificationRequest;
import com.halitkorkmaz.datamining.bean.response.GenericResponseDto;
import com.halitkorkmaz.datamining.controller.DataController;
import com.halitkorkmaz.datamining.service.ClassificationService;
import com.halitkorkmaz.datamining.utils.ApplicationUtil;
import com.halitkorkmaz.datamining.utils.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import weka.classifiers.Classifier;
import weka.classifiers.bayes.NaiveBayes;
import weka.classifiers.evaluation.Evaluation;
import weka.classifiers.lazy.IBk;
import weka.classifiers.trees.J48;
import weka.classifiers.trees.RandomForest;
import weka.core.Instances;
import weka.core.converters.ConverterUtils;
import weka.filters.Filter;
import weka.filters.unsupervised.instance.Randomize;

import java.nio.file.Path;
import java.util.Random;

@Service
public class ClassificationServiceImpl implements ClassificationService {

    private static final Logger logger = LoggerFactory.getLogger(DataController.class);

    @Autowired
    private ApplicationUtil applicationUtil;

    public GenericResponseDto<ClassificationResult> classify(ClassificationRequest request, String fileName) {
        if (StringUtils.isEmpty(fileName)) {
            return new GenericResponseDto<>(null, "Please import a data set!", Constants.ERROR_WITH_POPUP);

        }

        Path fileLocation = applicationUtil.getFileDirectory().resolve(fileName);
        String filePath = fileLocation.normalize().toString();

        try {
            // set classifier
            weka.classifiers.Classifier classifier = getWekaClassifier(request.getClassifier().getCode());
            if (classifier == null) {
                return new GenericResponseDto<>(null, "Classification Method not found!", Constants.ERROR_WITH_POPUP);
            }

            // create data set
            ConverterUtils.DataSource source = new ConverterUtils.DataSource(filePath);
            Instances instances = source.getDataSet();

            // set last attribute as a class
            instances.setClassIndex(instances.numAttributes() - 1);

            // randomize instances
            Filter myRandom = new Randomize();
            myRandom.setInputFormat(instances);
            instances = Filter.useFilter(instances, myRandom);

            String result = getEvaluationResult(instances, classifier, request.getTestMethod().getCode(), request.getPercentSplit(), request.getFolds());
            return new GenericResponseDto<>(new ClassificationResult(result), "Data set has been classified by latest attribute.", Constants.SUCCESS_WITH_POPUP);
        } catch (java.io.FileNotFoundException fex) {
            logger.info("File not found " + fileName);
            return new GenericResponseDto<>(null, "File not found " + fileName, Constants.ERROR_WITH_POPUP);
        } catch (java.lang.Exception ex) {
            logger.info("Unexpected error occured while classifying! " + ex.getMessage());
            return new GenericResponseDto<>(null, "Unexpected error occured!", Constants.ERROR_WITH_POPUP);
        }
    }

    private weka.classifiers.Classifier getWekaClassifier(String classificationMethod) {
        if (ClassificationMethod.DECISION_TREE.getCode().equals(classificationMethod)) {
            return new J48();
        } else if (ClassificationMethod.RANDOM_FOREST.getCode().equals(classificationMethod)) {
            return new RandomForest();
        } else if (ClassificationMethod.NAIVE_BAYES.getCode().equals(classificationMethod)) {
            return new NaiveBayes();
        } else if (ClassificationMethod.K_NEAREST_NEIGHBOURHOOD.getCode().equals(classificationMethod)) {
            return new IBk();
        } else {
            return null;
        }
    }

    private String getEvaluationResult(Instances instances, Classifier classifier, String testMethod, Integer percentSplit, Integer folds) throws Exception {
        if ("PERCENT_SPLIT".equals(testMethod)) {
            return percentageSplitEvaluation(instances, classifier, percentSplit);
        } else if ("CROSS_VALIDATION".equals(testMethod)) {
            return crossValidateEvaluation(instances, classifier, folds);
        }

        return null;
    }

    private String percentageSplitEvaluation(Instances instances, Classifier classifier, Integer percentSplit) throws Exception {
        // set train sample size
        int trainSize = instances.numInstances() * percentSplit / 100;

        // set train and test samples
        weka.core.Instances train = new weka.core.Instances(instances, 0, trainSize);
        weka.core.Instances test = new weka.core.Instances(instances, trainSize, instances.size() - trainSize);

        // build classifier
        classifier.buildClassifier(train);

        // evaluate result
        Evaluation eval = new Evaluation(train);
        eval.evaluateModel(classifier, test);
        return getClassificationResult(eval, classifier);
    }

    private String crossValidateEvaluation(Instances instances, Classifier classifier, Integer folds) throws Exception {
        Random rand = new Random(1);  // using seed = 1

        // evaluate result
        Evaluation eval = new Evaluation(instances);
        eval.crossValidateModel(classifier, instances, folds, rand);

        // build classifier
        classifier.buildClassifier(instances);

        return getClassificationResult(eval, classifier);
    }

    private String getClassificationResult(Evaluation evaluation, Classifier classifier) throws Exception {

        return evaluation.toSummaryString(true) + "\n\n"
                + evaluation.toMatrixString() + "\n\n"
                + evaluation.toClassDetailsString() + "\n\n"
                + "=== Classifier === \n\n"
                + classifier.toString() + "\n\n";
    }
}
