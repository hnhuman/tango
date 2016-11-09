package com.tango.core.mybatis.xmltags;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import com.google.common.base.Strings;

public abstract class BaseNode {
	private Document doc;

	public BaseNode(Document doc) {
		this.setDoc(doc);
	}

	public abstract Node build();

	public Document getDoc() {
		return doc;
	}

	public void setDoc(Document doc) {
		this.doc = doc;
	}

	public void setAttribute(Element element, String attribute, String value) {
		if (!Strings.isNullOrEmpty(value)) {
			element.setAttribute(attribute, value);
		}
	}

}
