package com.halitkorkmaz.datamining.bean.request;

import com.halitkorkmaz.datamining.bean.dto.DataBean;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassificationRequest {

    @NotNull
    private DataBean classifier;

    @NotNull
    private DataBean testMethod;

    private int percentSplit;

    private int folds;
}

