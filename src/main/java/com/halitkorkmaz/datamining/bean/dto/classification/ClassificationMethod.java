package com.halitkorkmaz.datamining.bean.dto.classification;

public enum ClassificationMethod {
    DECISION_TREE("J48", "DECISION_TREE"),
    RANDOM_FOREST("RF", "RANDOM_FOREST"),
    NAIVE_BAYES("NB", "NAIVE_BAYES"),
    K_NEAREST_NEIGHBOURHOOD("KNN", "K_NEAREST_NEIGHBOURHOOD");


    private final String code;
    private final String longCode;

    ClassificationMethod(String code, String longCode) {
        this.code = code;
        this.longCode = longCode;
    }

    public String getCode() {
        return this.code;
    }

    public String getLongCode() {
        return longCode;
    }
}
