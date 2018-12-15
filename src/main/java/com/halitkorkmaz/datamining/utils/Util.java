package com.halitkorkmaz.datamining.utils;

import com.halitkorkmaz.datamining.bean.response.BaseResponse;
import org.springframework.validation.Errors;

public class Util {

    public static BaseResponse errorsToBaseResponse(Errors errors) {
        BaseResponse baseResponse = new BaseResponse(errors);
        baseResponse.setStatusCode(Constants.ERROR_VALIDATION);
        return baseResponse;
    }
}
