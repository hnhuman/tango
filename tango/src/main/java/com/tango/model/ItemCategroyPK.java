package com.tango.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the tango_item_categroy database table.
 * 
 */
@Embeddable
public class ItemCategroyPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	private String id;

	private int grade;

	public ItemCategroyPK() {
	}
	public String getId() {
		return this.id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getGrade() {
		return this.grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof ItemCategroyPK)) {
			return false;
		}
		ItemCategroyPK castOther = (ItemCategroyPK)other;
		return 
			this.id.equals(castOther.id)
			&& (this.grade == castOther.grade);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.id.hashCode();
		hash = hash * prime + this.grade;
		
		return hash;
	}
}