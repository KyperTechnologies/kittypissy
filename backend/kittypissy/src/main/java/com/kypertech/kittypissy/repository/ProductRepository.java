package com.kypertech.kittypissy.repository;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.kypertech.kittypissy.model.ProductInfo;

@Repository
@Transactional
public interface ProductRepository extends CrudRepository<ProductInfo, String>  {


	public ProductInfo findById(Integer id);
		
	public ProductInfo findByCode(String code);
}
