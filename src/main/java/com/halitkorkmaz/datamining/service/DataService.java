package com.halitkorkmaz.datamining.service;

import com.halitkorkmaz.datamining.bean.dto.data.DataDownloadResult;
import com.halitkorkmaz.datamining.bean.dto.data.DataUploadResult;
import com.halitkorkmaz.datamining.bean.response.GenericResponseDto;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

public interface DataService {

    GenericResponseDto<DataUploadResult> upload(MultipartFile file);

    GenericResponseDto<DataDownloadResult> download(String fileName, HttpServletRequest request);
}
