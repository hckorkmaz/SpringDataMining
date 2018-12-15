package com.halitkorkmaz.datamining.controller;

import com.halitkorkmaz.datamining.bean.request.ClassificationRequest;
import com.halitkorkmaz.datamining.service.ClassificationService;
import com.halitkorkmaz.datamining.utils.ApplicationUtil;
import com.halitkorkmaz.datamining.utils.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/classification")
public class ClassificationController {

    @Autowired
    private ClassificationService classificationService;

    @PostMapping("/classify")
    public ResponseEntity<?> classify(@RequestBody @Valid ClassificationRequest classificationRequest, Errors errors, HttpServletRequest request) {
        if (errors.hasErrors()) {
            return new ResponseEntity<>(Util.errorsToBaseResponse(errors), HttpStatus.OK);
        }

        return new ResponseEntity<>(classificationService.classify(classificationRequest, ApplicationUtil.getFileName(request)), HttpStatus.OK);
    }
}   
