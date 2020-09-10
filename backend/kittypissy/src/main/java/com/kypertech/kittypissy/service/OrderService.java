package com.kypertech.kittypissy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kypertech.kittypissy.model.OrderInfo;
import com.kypertech.kittypissy.model.ProductInfo;
import com.kypertech.kittypissy.model.UserInfo;
import com.kypertech.kittypissy.repository.OrderRepository;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;
	
	public List<OrderInfo> getAllOrders() {
		Iterable<OrderInfo> orderIter = orderRepository.findAll();
		List<OrderInfo> orderList = new ArrayList<>();
		
		orderIter.forEach(order -> {
			orderList.add(order);
		});
		return orderList;
	}
	
	public List<OrderInfo> getOrderByUserInfo(UserInfo user) {
		return orderRepository.findByBuyer(user);
	}
	
	public OrderInfo getOrderById(Integer id) {
		return orderRepository.findById(id);
	}
	
	public OrderInfo orderProduct(UserInfo user, ProductInfo product, String checkoutType) {
		OrderInfo order = new OrderInfo();
		order.setBuyer(user);
		order.setProduct(product);
		order.setCheckoutType(checkoutType);
		order.setStatus("Ordered");
		return orderRepository.save(order);
	}
	
	public OrderInfo setStatus(OrderInfo order, String status) {
		order.setStatus(status);
		return orderRepository.save(order);
	}
}
