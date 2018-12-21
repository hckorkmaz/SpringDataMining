package com.halitkorkmaz.datamining.service.Impl;

import com.halitkorkmaz.datamining.bean.dto.data.DataDownloadResult;
import com.halitkorkmaz.datamining.bean.dto.data.DataUploadResult;
import com.halitkorkmaz.datamining.bean.response.GenericResponseDto;
import com.halitkorkmaz.datamining.controller.DataController;
import com.halitkorkmaz.datamining.service.DataService;
import com.halitkorkmaz.datamining.utils.ApplicationUtil;
import com.halitkorkmaz.datamining.utils.Constants;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;


@Service
public class DataServiceImpl implements DataService {


    private static final Logger logger = LoggerFactory.getLogger(DataController.class);
    @Autowired
    private ApplicationUtil applicationUtil;

    public GenericResponseDto<DataUploadResult> upload(MultipartFile file) {

        // Normalize file name
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        String fileName = UUID.randomUUID().toString() + "." + fileExtension;

        try {
            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = applicationUtil.getFileDirectory().resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return new GenericResponseDto<>(new DataUploadResult(fileName, file.getContentType()), "Data imported.", Constants.SUCCESS_WITH_POPUP);
        } catch (IOException ex) {
            logger.info("Sorry! Filename contains invalid path sequence " + fileName);
            return new GenericResponseDto<>(null, "Could not store file " + fileName + ". Please try again!", Constants.ERROR_WITH_POPUP);
        }
    }

    public GenericResponseDto<DataDownloadResult> download(String fileName, HttpServletRequest request) {
        try {
            Path filePath = applicationUtil.getFileDirectory().resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                // Try to determine file's content type
                String contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

                // Fallback to the default content type if type could not be determined
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return new GenericResponseDto<>(new DataDownloadResult(resource, resource.getFilename(), contentType), "Data imported.", Constants.SUCCESS_WITH_POPUP);
            } else {
                logger.info("File not found " + fileName);
                return new GenericResponseDto<>(null, "File not found " + fileName, Constants.ERROR_WITH_POPUP);
            }
        } catch (IOException ex) {
            logger.info("File not found " + fileName);
            return new GenericResponseDto<>(null, "File not found " + fileName, Constants.ERROR_WITH_POPUP);
        }
    }
}
