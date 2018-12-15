package com.halitkorkmaz.datamining.bean.dto.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.Resource;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataDownloadResult implements Serializable {
    private Resource resource;
    private String fileName;
    private String contentType;
}
