package com.halitkorkmaz.datamining.bean.response;

import lombok.Data;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class BaseResponse implements Serializable {
    private int statusCode;
    private List<ValidationError> errorMessages;
    private String message;

    public BaseResponse() {
        errorMessages = new ArrayList<>();
    }

    public BaseResponse(Errors errors) {
        this.errorMessages = new ArrayList<>();

        for (ObjectError objectError : errors.getAllErrors()) {
            this.errorMessages.add(this.getValidationErrorFromObjectError((FieldError) objectError));
        }
    }

    private ValidationError getValidationErrorFromObjectError(FieldError objectError) {
        return new ValidationError(
                objectError.getCode(),
                objectError.getDefaultMessage(),
                objectError.getObjectName(),
                objectError.getField(),
                objectError.getRejectedValue()
        );
    }
}
