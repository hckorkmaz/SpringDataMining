package com.halitkorkmaz.datamining.bean.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataBean implements Serializable {
    private String code;
    private String Name;
}
