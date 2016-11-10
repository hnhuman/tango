package com.tango.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the tango_item_categroy_brand database table.
 * 
 */
@Embeddable
public class ItemCategroyBrandPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="item_categroy_id")
	private String itemCategroyId;

	@Column(name="brand_id")
	private String brandId;

	public ItemCategroyBrandPK() {
	}
	public String getItemCategroyId() {
		return this.itemCategroyId;
	}
	public void setItemCategroyId(String itemCategroyId) {
		this.itemCategroyId = itemCategroyId;
	}
	public String getBrandId() {
		return this.brandId;
	}
	public void setBrandId(String brandId) {
		this.brandId = brandId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof ItemCategroyBrandPK)) {
			return false;
		}
		ItemCategroyBrandPK castOther = (ItemCategroyBrandPK)other;
		return 
			this.itemCategroyId.equals(castOther.itemCategroyId)
			&& this.brandId.equals(castOther.brandId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.itemCategroyId.hashCode();
		hash = hash * prime + this.brandId.hashCode();
		
		return hash;
	}
}