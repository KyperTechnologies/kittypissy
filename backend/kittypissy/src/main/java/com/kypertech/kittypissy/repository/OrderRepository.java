package com.kypertech.kittypissy.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.kypertech.kittypissy.model.OrderInfo;
import com.kypertech.kittypissy.model.UserInfo;

@Repository
@Transactional
public interface OrderRepository extends CrudRepository<OrderInfo, String>  {


	public OrderInfo findById(Integer id);
		
	public List<OrderInfo> findByBuyer(UserInfo user);
}
