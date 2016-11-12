package com.tango.model.vo;

import java.math.BigDecimal;
import java.math.BigInteger;

public class ItemVo {

	private String id;

	private String introduction;
	
	private String periods;

	private BigDecimal maxPrice;
	
	private String selectPrice;

	private BigDecimal price;

	private String subTitle;

	private String title;

	private BigDecimal total;

	private String url;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public BigDecimal getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(BigDecimal maxPrice) {
		this.maxPrice = maxPrice;
	}

	public String getSelectPrice() {
		return selectPrice;
	}

	public void setSelectPrice(String selectPrice) {
		this.selectPrice = selectPrice;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getSubTitle() {
		return subTitle;
	}

	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPeriods() {
		return periods;
	}

	public void setPeriods(String periods) {
		this.periods = periods;
	}
	
}
