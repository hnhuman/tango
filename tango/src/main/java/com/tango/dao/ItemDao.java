package com.tango.dao;

import com.github.pagehelper.Page;
import com.tango.model.condition.ItemCondition;
import com.tango.model.vo.ItemVo;

public interface ItemDao {

	Page<ItemVo> findPage(ItemCondition condition);
	
}
