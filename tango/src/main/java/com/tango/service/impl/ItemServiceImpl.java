package com.tango.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tango.dao.ItemDao;
import com.tango.service.ItemService;

@Service
public class ItemServiceImpl implements ItemService {
	
	@Autowired
	private ItemDao itemDao;
	
	

}
