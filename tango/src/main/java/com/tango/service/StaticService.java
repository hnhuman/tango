package com.tango.service;

import java.util.Map;

import com.tango.model.vo.ItemVo;

public interface StaticService {
	/**
	 * 生成静态
	 * 
	 * @param templatePath
	 *            模板文件路径
	 * @param staticPath
	 *            静态文件路径
	 * @param model
	 *            数据
	 * @return 生成数量
	 */
	int generate(String templatePath, String staticPath, Map<String, Object> model);
	
	/**
	 * 生成静态
	 * 
	 * @param goods
	 *            货品
	 * @return 生成数量
	 */
	int generate(ItemVo itemVo);

	/**
	 * 生成货品静态
	 * 
	 */
	int generateGoods();
}
