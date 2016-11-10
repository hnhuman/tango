package com.tango.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the tango_item_categroy_brand database table.
 * 
 */
@Entity
@Table(name="tango_item_categroy_brand")
@NamedQuery(name="TangoItemCategroyBrand.findAll", query="SELECT t FROM TangoItemCategroyBrand t")
public class ItemCategroyBrand implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private ItemCategroyBrandPK id;

	public ItemCategroyBrand() {
	}

	public ItemCategroyBrandPK getId() {
		return this.id;
	}

	public void setId(ItemCategroyBrandPK id) {
		this.id = id;
	}

}