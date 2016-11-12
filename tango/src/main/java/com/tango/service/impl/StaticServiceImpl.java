package com.tango.service.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.tango.dao.ItemDao;
import com.tango.model.vo.ItemVo;
import com.tango.service.StaticService;

import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
public class StaticServiceImpl implements StaticService , ServletContextAware {
	
	private ServletContext servletContext;
	
	@Autowired
	private FreeMarkerConfigurer freeMarkerConfigurer;
	@Autowired
	private ItemDao itemDao;

	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}

	public int generate(String templatePath, String staticPath,
			Map<String, Object> model) {
		Assert.hasText(templatePath);
		Assert.hasText(staticPath);

		Writer writer = null;
		try {
			Template template = freeMarkerConfigurer.getConfiguration().getTemplate(templatePath);
			File staticFile = new File(servletContext.getRealPath(staticPath));
			File staticDir = staticFile.getParentFile();
			if (staticDir != null) {
				staticDir.mkdirs();
			}
			writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(staticFile), "UTF-8"));
			template.process(model, writer);
			writer.flush();
			return 1;
		} catch (IOException e) {
			throw new RuntimeException(e.getMessage(), e);
		} catch (TemplateException e) {
			throw new RuntimeException(e.getMessage(), e);
		} finally {
			IOUtils.closeQuietly(writer);
		}
	}

	public int generate(ItemVo itemVo) {
		if (itemVo == null) {
			return 0;
		}
		delete(itemVo);
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("item", itemVo);
		return generate("/shop/item/content.ftl", itemVo.getUrl(), model);
	}
	
	@Transactional
	public int delete(ItemVo itemVo) {
		if (itemVo == null || StringUtils.isEmpty(itemVo.getUrl())) {
			return 0;
		}
		return delete(itemVo.getUrl());
	}
	
	@Transactional(readOnly = true)
	public int delete(String staticPath) {
		if (StringUtils.isEmpty(staticPath)) {
			return 0;
		}
		File staticFile = new File(servletContext.getRealPath(staticPath));
		return FileUtils.deleteQuietly(staticFile) ? 1 : 0;
	}

	@Override
	public int generateGoods() {
		int generateCount = 0;
		int pageNum = 1;
		int pageSize = 100;
		while(true){
			PageHelper.startPage(pageNum, pageSize);
			Page<ItemVo> page = itemDao.findPage();
			if(CollectionUtils.isNotEmpty(page)){
				for(int i=0 ; i<page.size() ; i++){
					ItemVo itemVo = page.get(i);
					generateCount += generate(itemVo);
				}
			}
			if(page.size() < 100){
				break;
			}
			pageNum++;
		}
		return generateCount;
	}


}
