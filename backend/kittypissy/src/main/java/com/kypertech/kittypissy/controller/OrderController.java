package com.kypertech.kittypissy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kypertech.kittypissy.model.OrderInfo;
import com.kypertech.kittypissy.model.UserInfo;
import com.kypertech.kittypissy.service.OrderService;
import com.kypertech.kittypissy.service.UserService;

@RestController
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/getAllOrders")
	public Object getAllOrders(@RequestHeader HttpHeaders requestHeaders) {
		List<OrderInfo> orderList = orderService.getAllOrders();
		return new ResponseEntity<>(orderList, HttpStatus.OK);
	}	
	
	@GetMapping("/getOrdersByEmail")
	public Object getOrdersByEmail(@RequestHeader HttpHeaders requestHeaders, @RequestParam String userEmail) {
		UserInfo user = userService.getUserByEmail(userEmail);
		if (user == null) {
			return new ResponseEntity<>("Kullanici bulunamadi", HttpStatus.BAD_REQUEST);
		}
		
		List<OrderInfo> orderList = orderService.getOrderByUserInfo(user);
		return new ResponseEntity<>(orderList, HttpStatus.OK);
	}
	
	@GetMapping("/getOrderById")
	public Object getOrderById(@RequestHeader HttpHeaders requestHeaders, @RequestParam Integer orderId) {
		OrderInfo order = orderService.getOrderById(orderId);
		if (order == null) {
			return new ResponseEntity<>("Siparis bulunamadi", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(order, HttpStatus.OK);
	}
	
	@PostMapping("/changeStatus")
	public Object changeStatus(@RequestHeader HttpHeaders requestHeaders, @RequestBody Map<String, Object> body) {
		Integer orderId = (Integer) body.get("orderId");
		String status = (String) body.get("status");
		OrderInfo order = orderService.getOrderById(orderId);
		if (order == null) {
			return new ResponseEntity<>("Siparis bulunamadi", HttpStatus.BAD_REQUEST);
		}
		order = orderService.setStatus(order, status);
		return new ResponseEntity<>(order, HttpStatus.OK);
	}
}
