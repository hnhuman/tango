package com.tango.config.freemarker;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

@Configuration
@PropertySource("classpath:/application.properties")
public class FreemarkerConfiguration {
	
	@Autowired
	private Environment env;

	@Bean
	public FreeMarkerConfigurer freeMarkerConfigurer(){
		FreeMarkerConfigurer config = new FreeMarkerConfigurer();
		config.setTemplateLoaderPaths("classpath:/templates");
		Properties settings = new Properties();
		settings.setProperty("defaultEncoding", "UTF-8");
		settings.setProperty("url_escaping_charset", "UTF-8");
		settings.setProperty("locale", "zh_CN");
		settings.setProperty("template_update_delay", "0");
		settings.setProperty("tag_syntax", "auto_detect");
		settings.setProperty("whitespace_stripping", "true");
		settings.setProperty("classic_compatible", "true");
		settings.setProperty("number_format", "0.######");
		settings.setProperty("boolean_format", "true,false");
		settings.setProperty("datetime_format", "yyyy-MM-dd");
		settings.setProperty("date_format", "yyyy-MM-dd");
		settings.setProperty("time_format", "yyyy-MM-dd");
		settings.setProperty("object_wrapper", "freemarker.ext.beans.BeansWrapper");
		config.setFreemarkerSettings(settings);
		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("systemName", env.getProperty("system.name"));
		config.setFreemarkerVariables(variables);
		return config;
	}

}
