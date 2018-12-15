package com.halitkorkmaz.datamining.bean.dto.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataUploadResult implements Serializable {
    private String fileName;
    private String fileType;
}
