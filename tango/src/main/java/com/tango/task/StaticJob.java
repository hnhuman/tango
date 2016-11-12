package com.tango.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.tango.service.StaticService;

/**
 * Job - 静态化
 * 
 * @author SHOP++ Team
 * @version 4.0
 */
@Lazy(false)
@Component("staticJob")
public class StaticJob {
	
	@Autowired
	private StaticService staticService;

	/**
	 * 生成货品静态(即时)
	 */
	@Scheduled(fixedDelayString = "${job.static_generate_eager_goods.delay}")
	public void generateEagerGoods() {
		staticService.generateGoods();
	}

}