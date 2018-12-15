package com.halitkorkmaz.datamining.bean.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class GenericResponseDto<T> extends BaseResponse {
    private T data;

    public GenericResponseDto() {
        super();
        super.setStatusCode(30);
    }

    public GenericResponseDto(T data) {
        super();
        this.data = data;
        super.setStatusCode(30);
    }

    public GenericResponseDto(T data, int statusCode) {
        super();
        this.data = data;
        super.setStatusCode(statusCode);
    }

    public GenericResponseDto(T data, String message, int statusCode) {
        super();
        super.setMessage(message);
        super.setStatusCode(statusCode);
        this.data = data;
    }
}
