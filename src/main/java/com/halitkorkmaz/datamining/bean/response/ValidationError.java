package com.halitkorkmaz.datamining.bean.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ValidationError {
    private String code;
    private String defaultMessage;
    private String objectName;
    private String field;
    private Object rejectedValue;
}
