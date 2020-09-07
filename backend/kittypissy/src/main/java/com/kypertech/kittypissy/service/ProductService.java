package com.kypertech.kittypissy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kypertech.kittypissy.model.ProductInfo;
import com.kypertech.kittypissy.repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	public ProductInfo getProductById(Integer id) {
		return productRepository.findById(id);
	}
	
	public ProductInfo getProductByCode(String code) {
		return productRepository.findByCode(code);
	}
	
	public ProductInfo addProduct(String code, String description, String image, String name, Double price) {
		ProductInfo product = new ProductInfo();
		product.setCode(code);
		product.setDescription(description);
		product.setImage(image);
		product.setName(name);
		product.setPrice(price);
		return productRepository.save(product);
	}
	
	public ProductInfo updateProduct(String code, String description, String image, String name, Double price) {
		ProductInfo product = getProductByCode(code);
		product.setDescription(description);
		product.setImage(image);
		product.setName(name);
		product.setPrice(price);
		return productRepository.save(product);
	}
	
	public void removeProductById(Integer id) {
		ProductInfo product = getProductById(id);
		productRepository.delete(product);
	}
	
	public void removeProductByCode(String code) {
		ProductInfo product = getProductByCode(code);
		productRepository.delete(product);
	}
	
	
}
