package com.kypertech.kittypissy.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kypertech.kittypissy.model.ProductInfo;
import com.kypertech.kittypissy.service.ProductService;

@RestController
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@GetMapping("/getAllProducts")
	public Object getAllProducts() {
		List<ProductInfo> productList = productService.getAllProducts();
		Map<String, Object> result = new LinkedHashMap<String, Object>();
		return new ResponseEntity<>(productList, HttpStatus.OK);	
	}
}
