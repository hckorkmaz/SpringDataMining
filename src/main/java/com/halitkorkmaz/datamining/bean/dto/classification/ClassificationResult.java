package com.halitkorkmaz.datamining.bean.dto.classification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassificationResult implements Serializable {
    private String classificationResult;
}
