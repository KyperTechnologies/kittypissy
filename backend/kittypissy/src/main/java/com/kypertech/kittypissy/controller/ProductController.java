package com.kypertech.kittypissy.controller;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kypertech.kittypissy.model.ProductInfo;
import com.kypertech.kittypissy.service.ProductService;

@RestController
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@GetMapping("/getAllProducts")
	public Object getAllProducts(@RequestHeader HttpHeaders requestHeaders) {
		List<ProductInfo> productList = productService.getAllProducts();
		return new ResponseEntity<>(productList, HttpStatus.OK);	
	}
	
	@GetMapping("/getPreviewProducts")
	public Object getPreviewProducts(@RequestHeader HttpHeaders requestHeaders) {
		List<ProductInfo> productList = productService.getPreviewProducts();
		return new ResponseEntity<>(productList, HttpStatus.OK);	
	}
	
	@GetMapping("/getProductById")
	public Object getProductById(@RequestHeader HttpHeaders requestHeaders, @RequestParam Integer productId) {
		ProductInfo product = productService.getProductById(productId);
		if (product == null) {
			return new ResponseEntity<>("Urun alinamadi", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(product, HttpStatus.OK);	
	}
	
	@PostMapping("/addProduct")
	public Object addProduct(@RequestHeader HttpHeaders requestHeaders, @RequestParam("file") MultipartFile file, 
			@RequestParam String name, @RequestParam String code, @RequestParam String description, @RequestParam Double price) {
		
		ProductInfo product = null;
		try {
			product = productService.addProduct(code, description, file, name, price);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		if (product == null) {
			return new ResponseEntity<>("Urun eklenemedi", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("", HttpStatus.OK);	
	}
	
	@PostMapping("/updateProduct")
	public Object updateProduct(@RequestHeader HttpHeaders requestHeaders, @RequestParam Integer productId,
			@RequestParam String name, @RequestParam String code, @RequestParam String description, @RequestParam Double price) {
		
		ProductInfo product = productService.getProductById(productId);
		try {
			product = productService.updateProduct(product, code, description, name, price);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		if (product == null) {
			return new ResponseEntity<>("Urun guncellenemedi", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("", HttpStatus.OK);	
	}
	
	@PostMapping("/updateProductImage")
	public Object updateProductImage(@RequestHeader HttpHeaders requestHeaders, @RequestParam Integer productId, @RequestParam("file") MultipartFile file) {
		
		ProductInfo product = productService.getProductById(productId);
		try {
			product = productService.updateProductImage(product, file);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		if (product == null) {
			return new ResponseEntity<>("Urun guncellenemedi", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("", HttpStatus.OK);	
	}
	
	@PostMapping("/deleteProduct")
	public Object deleteProduct(@RequestHeader HttpHeaders requestHeaders, @RequestParam Integer productId) {
		boolean isDeleted = false;
		try {
			isDeleted = productService.removeProductById(productId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if (!isDeleted) {
			return new ResponseEntity<>("Urun silinemedi", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("", HttpStatus.OK);	
	}
	
}
