package com.halitkorkmaz.datamining.bean.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassificationRequest {

    @NotNull
    private int percentSplit;

    @NotNull
    private String classifier;
}

