package com.tango.config.mybatis;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.util.Assert;

import com.github.pagehelper.PageHelper;
import com.tango.core.mybatis.MySqlSessionFactoryBean;

/**
 * {@link EnableAutoConfiguration Auto-Configuration} for Mybatis. Contributes a
 * {@link SqlSessionFactory} and a {@link SqlSessionTemplate}.
 *
 * If {@link org.mybatis.spring.annotation.MapperScan} is used, or a configuration file is
 * specified as a property, those will be considered, otherwise this auto-configuration
 * will attempt to register mappers based on the interface definitions in or under the
 * root auto-configuration package.
 *
 * @author Eddú Meléndez
 * @author Josh Long
 */
@Configuration
@ConditionalOnClass({ SqlSessionFactory.class, SqlSessionFactoryBean.class })
//@ConditionalOnBean(DataSource.class)
@MapperScan("com.tango.dao")
@EnableConfigurationProperties(MybatisProperties.class)
@AutoConfigureAfter(DataSourceAutoConfiguration.class)
public class MybatisAutoConfiguration {

    private static Log log = LogFactory.getLog(MybatisAutoConfiguration.class);

    @Autowired
    private MybatisProperties properties;

    @Autowired(required = false)
    private Interceptor[] interceptors;

    @Autowired
    private ResourceLoader resourceLoader = new DefaultResourceLoader();

    @PostConstruct
    public void checkConfigFileExists() {
        if (this.properties.isCheckConfigLocation()) {
            Resource resource = this.resourceLoader
                    .getResource(this.properties.getConfig());
            Assert.state(resource.exists(),
                    "Cannot find config location: " + resource
                            + " (please add config file or check your Mybatis "
                            + "configuration)");
        }
    }
    
    @Bean(name = "sqlSessionFactory")
    @ConditionalOnMissingBean
	public MySqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource) throws IOException {
		MySqlSessionFactoryBean sqlSessionFactoryBean = new MySqlSessionFactoryBean();
		sqlSessionFactoryBean.setDaoBasePackage("com.tango.dao");
		sqlSessionFactoryBean.setDataSource(dataSource);
		sqlSessionFactoryBean.setModelBasePackage("com.tango.model");
		sqlSessionFactoryBean.setDaoSuffix("Dao");
		sqlSessionFactoryBean.setModelSuffix("Entity");
		List<Interceptor> plugins = new ArrayList<Interceptor>();
		// 显示SQL语句，可以打开，但不要提交
		// plugins.add(new ShowSQLInterceptor());
		PageHelper pageHelper = new PageHelper();
		Properties properties = new Properties();
		properties.put("dialect", "mysql");
		properties.put("offsetAsPageNum", false);
		properties.put("rowBoundsWithCount", true);
		properties.put("reasonable", true);
		pageHelper.setProperties(properties);
		plugins.add(pageHelper);
		sqlSessionFactoryBean.setPlugins(plugins.toArray(new Interceptor[] {}));
		Resource[] resources = new PathMatchingResourcePatternResolver().getResources("classpath:mappers/*.xml");
		sqlSessionFactoryBean.setMapperLocations(resources);
		return sqlSessionFactoryBean;
	}

    @Bean
    @ConditionalOnMissingBean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory,
                this.properties.getExecutorType());
    }

    /**
     * 分页插件
     *
     * @param dataSource
     * @return
     * @author SHANHY
     * @create  2016年2月18日
     */
    @Bean
    public PageHelper pageHelper(DataSource dataSource) {
        log.info("注册MyBatis分页插件PageHelper");
        PageHelper pageHelper = new PageHelper();
        Properties p = new Properties();
        p.setProperty("offsetAsPageNum", "true");
        p.setProperty("rowBoundsWithCount", "true");
        p.setProperty("reasonable", "true");
        pageHelper.setProperties(p);
        return pageHelper;
    }

}
