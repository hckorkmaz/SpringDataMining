package com.halitkorkmaz.datamining.bean.dto.classification;

public enum Classifier {
    DECISION_TREE("J48"),
    RANDOM_FOREST("RF"),
    NAIVE_BAYES("NB"),
    K_NEAREST_NEIGHBOURHOOD("KNN");


    private final String code;

    Classifier(String code) {
        this.code = code;
    }

    public String getCode() {
        return this.code;
    }
}
