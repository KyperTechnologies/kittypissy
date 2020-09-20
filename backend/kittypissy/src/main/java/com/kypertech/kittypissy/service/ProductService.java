package com.kypertech.kittypissy.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kypertech.kittypissy.model.ProductInfo;
import com.kypertech.kittypissy.repository.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	public ProductInfo getProductById(Integer id) {
		return productRepository.findById(id);
	}
	public List<ProductInfo> getAllProducts(){
		Iterable<ProductInfo> productIter = productRepository.findAll();
		List<ProductInfo> productList = new ArrayList<ProductInfo>();
		productIter.forEach(product -> {
			productList.add(product);
		});
		return productList;
	}
	
	public List<ProductInfo> getPreviewProducts() {
		Iterable<ProductInfo> productIter = productRepository.findAll();
		List<ProductInfo> productList = new ArrayList<ProductInfo>();
		productIter.forEach(product -> {
			if (productList.size() < 4) {
				productList.add(product);
			}
		});
		return productList;
	}
	
	public ProductInfo getProductByCode(String code) {
		return productRepository.findByCode(code);
	}
	
	public ProductInfo addProduct(String code, String description, MultipartFile file, String name, Double price) throws IOException {
		ProductInfo product = new ProductInfo();
		byte[] image = file.getBytes();
		product.setCode(code);
		product.setDescription(description);
		product.setImage(image);
		product.setName(name);
		product.setPrice(price);
		return productRepository.save(product);
	}
	
	public ProductInfo updateProduct(ProductInfo product, String code, String description, String name, Double price) throws IOException {
		product.setDescription(description);
		product.setName(name);
		product.setPrice(price);
		product.setCode(code);
		return productRepository.save(product);
	}
	
	public ProductInfo updateProductImage(ProductInfo product, MultipartFile file) throws IOException {
		byte[] image = file.getBytes();
		product.setImage(image);
		return productRepository.save(product);
	}
	
	public boolean removeProductById(Integer id) {
		ProductInfo product = getProductById(id);
		if (product != null) {
			try {
				productRepository.delete(product);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return true;
		}
		return false;
	}
	
	public void removeProductByCode(String code) {
		ProductInfo product = getProductByCode(code);
		productRepository.delete(product);
	}
}
