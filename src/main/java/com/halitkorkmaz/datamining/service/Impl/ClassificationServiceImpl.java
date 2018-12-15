package com.halitkorkmaz.datamining.service.Impl;

import com.halitkorkmaz.datamining.bean.dto.classification.ClassificationResult;
import com.halitkorkmaz.datamining.bean.dto.classification.Classifier;
import com.halitkorkmaz.datamining.bean.request.ClassificationRequest;
import com.halitkorkmaz.datamining.bean.response.GenericResponseDto;
import com.halitkorkmaz.datamining.controller.DataController;
import com.halitkorkmaz.datamining.service.ClassificationService;
import com.halitkorkmaz.datamining.utils.Constants;
import com.halitkorkmaz.datamining.utils.ApplicationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import weka.classifiers.evaluation.Evaluation;
import weka.core.Instances;
import weka.core.converters.ConverterUtils;
import weka.filters.Filter;
import weka.filters.unsupervised.instance.Randomize;

import java.nio.file.Path;

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

        int percentSplit = request.getPercentSplit();

        try {
            // set classifier
            weka.classifiers.Classifier classifier;
            if (request.getClassifier().equals(Classifier.DECISION_TREE.getCode())) {
                classifier = new weka.classifiers.trees.J48();
            } else if (request.getClassifier().equals(Classifier.RANDOM_FOREST.getCode())) {
                classifier = new weka.classifiers.trees.RandomForest();
            } else if (request.getClassifier().equals(Classifier.NAIVE_BAYES.getCode())) {
                classifier = new weka.classifiers.bayes.NaiveBayes();
            } else if (request.getClassifier().equals(Classifier.K_NEAREST_NEIGHBOURHOOD.getCode())) {
                classifier = new weka.classifiers.lazy.IBk();
            } else {
                return new GenericResponseDto<>(null, "Classifier not found!", Constants.ERROR_WITH_POPUP);
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

            String result = eval.toSummaryString(true) + "\n\n" + eval.toMatrixString();
            return new GenericResponseDto<>(new ClassificationResult(result), "Data set has been classified by latest attribute.", Constants.SUCCESS_WITH_POPUP);
        } catch (java.io.FileNotFoundException fex) {
            logger.info("File not found " + fileName);
            return new GenericResponseDto<>(null, "File not found " + fileName, Constants.ERROR_WITH_POPUP);
        } catch (java.lang.Exception ex) {
            logger.info("Unexpected error occured while classifying!");
            return new GenericResponseDto<>(null, "Unexpected error occured!", Constants.ERROR_WITH_POPUP);
        }
    }
}
