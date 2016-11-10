package com.tango.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.util.Date;


/**
 * The persistent class for the tango_item_categroy database table.
 * 
 */
@Entity
@Table(name="tango_item_categroy")
@NamedQuery(name="TangoItemCategroy.findAll", query="SELECT t FROM TangoItemCategroy t")
public class ItemCategroy implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private ItemCategroyPK id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_date")
	private Date createDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modify_date")
	private Date modifyDate;

	private String name;

	@Column(name="parent_id")
	private BigInteger parentId;

	@Column(name="tree_path")
	private String treePath;

	public ItemCategroy() {
	}

	public ItemCategroyPK getId() {
		return this.id;
	}

	public void setId(ItemCategroyPK id) {
		this.id = id;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getModifyDate() {
		return this.modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigInteger getParentId() {
		return this.parentId;
	}

	public void setParentId(BigInteger parentId) {
		this.parentId = parentId;
	}

	public String getTreePath() {
		return this.treePath;
	}

	public void setTreePath(String treePath) {
		this.treePath = treePath;
	}

}