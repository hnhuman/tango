package com.tango;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@ServletComponentScan
@SpringBootApplication
@EnableTransactionManagement 
@EnableAspectJAutoProxy
@EnableWebMvc
@ComponentScan(basePackages = {"com.tango"}, excludeFilters = {@Filter(type = FilterType.ANNOTATION, value = Controller.class)})
public class TangoApplication {
    
	public static void main(String[] args) throws Exception {
		SpringApplication.run(TangoApplication.class, args);
	}
	
}
