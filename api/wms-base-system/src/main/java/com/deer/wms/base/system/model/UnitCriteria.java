package com.deer.wms.base.system.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by  on 2018/06/29.
*/
public class UnitCriteria extends QueryCriteria {
    private String keyWords;
    private Integer companyId;
    private  String unitCode;

    public String getUnitCode() {
        return unitCode;
    }

    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }
}
