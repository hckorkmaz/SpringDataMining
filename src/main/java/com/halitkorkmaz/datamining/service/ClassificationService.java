package com.halitkorkmaz.datamining.service;

import com.halitkorkmaz.datamining.bean.dto.classification.ClassificationResult;
import com.halitkorkmaz.datamining.bean.request.ClassificationRequest;
import com.halitkorkmaz.datamining.bean.response.GenericResponseDto;

public interface ClassificationService {

    GenericResponseDto<ClassificationResult> classify(ClassificationRequest request, String fileName);
}
