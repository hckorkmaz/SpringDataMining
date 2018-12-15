package com.halitkorkmaz.datamining.utils;

import com.halitkorkmaz.datamining.config.FileStorageProperties;
import com.halitkorkmaz.datamining.exception.FileStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class ApplicationUtil {

    private FileStorageProperties fileStorageProperties;

    public ApplicationUtil() {
    }

    @Autowired
    public ApplicationUtil(FileStorageProperties fileStorageProperties) {
        this.fileStorageProperties = fileStorageProperties;

        Path fileStorageLocation = Paths.get(this.fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public static String getFileName(final HttpServletRequest request) {
        return request.getHeader(Constants.UPLOADED_FILE_NAME_KEY);
    }

    public Path getFileDirectory() {
        return Paths.get(this.fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
    }
}
