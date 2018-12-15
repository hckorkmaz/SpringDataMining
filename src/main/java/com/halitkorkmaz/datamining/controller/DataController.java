package com.halitkorkmaz.datamining.controller;

import com.halitkorkmaz.datamining.bean.dto.data.DataDownloadResult;
import com.halitkorkmaz.datamining.bean.response.GenericResponseDto;
import com.halitkorkmaz.datamining.service.DataService;
import com.halitkorkmaz.datamining.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    private DataService dataService;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        return new ResponseEntity<>(dataService.upload(file), HttpStatus.OK);
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<?> download(@PathVariable("fileName") String fileName, HttpServletRequest request) {

        GenericResponseDto<DataDownloadResult> response = dataService.download(fileName, request);

        if (response.getStatusCode() != Constants.SUCCESS_WITH_POPUP) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(response.getData().getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + response.getData().getFileName() + "\"")
                .body(response.getData().getResource());
    }
}   
