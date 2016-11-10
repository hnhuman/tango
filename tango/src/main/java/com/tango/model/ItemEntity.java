package com.tango.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the tango_item database table.
 * 
 */
@Entity
@Table(name="tango_item")
@NamedQuery(name="ItemEntity.findAll", query="SELECT i FROM ItemEntity i")
public class ItemEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private String id;

	@Column(name="brand_id")
	private BigInteger brandId;

	@Column(name="category_id")
	private BigInteger categoryId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_time")
	private Date createTime;

	@Lob
	private String introduction;

	@Column(name="max_price")
	private BigDecimal maxPrice;

	private String owner;
	
	@Column(name="select_price")
	private String selectPrice;

	private BigDecimal price;

	@Column(name="sub_title")
	private String subTitle;

	private String title;

	private BigDecimal total;

	private String url;

	public ItemEntity() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public BigInteger getBrandId() {
		return this.brandId;
	}

	public void setBrandId(BigInteger brandId) {
		this.brandId = brandId;
	}

	public BigInteger getCategoryId() {
		return this.categoryId;
	}

	public void setCategoryId(BigInteger categoryId) {
		this.categoryId = categoryId;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getIntroduction() {
		return this.introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public BigDecimal getMaxPrice() {
		return this.maxPrice;
	}

	public void setMaxPrice(BigDecimal maxPrice) {
		this.maxPrice = maxPrice;
	}

	public String getOwner() {
		return this.owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public BigDecimal getPrice() {
		return this.price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getSubTitle() {
		return this.subTitle;
	}

	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public BigDecimal getTotal() {
		return this.total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getSelectPrice() {
		return selectPrice;
	}

	public void setSelectPrice(String selectPrice) {
		this.selectPrice = selectPrice;
	}

}