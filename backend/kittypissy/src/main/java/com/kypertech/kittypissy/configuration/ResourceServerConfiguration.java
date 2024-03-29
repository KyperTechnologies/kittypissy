package com.kypertech.kittypissy.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
	private static final String RESOURCE_ID = "resource-server-rest-api";
	
	@Override
	public void configure(ResourceServerSecurityConfigurer resources) {
		resources.resourceId(RESOURCE_ID);
	}
	
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/login").permitAll();
		http.authorizeRequests().antMatchers("/register").permitAll();
		http.authorizeRequests().antMatchers("/getPreviewProducts").permitAll();
		http.authorizeRequests().antMatchers("/sendMail").permitAll();

		http.authorizeRequests().antMatchers("/getOrdersByEmail").hasAnyRole("User");
		http.authorizeRequests().antMatchers("/getAllOrders").hasAnyRole("Admin");
		http.authorizeRequests().antMatchers("/addProduct").hasAnyRole("Admin");
		http.authorizeRequests().antMatchers("/deleteProduct").hasAnyRole("Admin");
		http.authorizeRequests().antMatchers("/updateProduct").hasAnyRole("Admin");
		http.authorizeRequests().antMatchers("/changeStatus").hasAnyRole("Admin");
		
		http.antMatcher("/**").authorizeRequests().anyRequest().authenticated();
	}

}
