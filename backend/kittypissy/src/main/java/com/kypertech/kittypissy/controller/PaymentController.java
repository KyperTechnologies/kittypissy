package com.kypertech.kittypissy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.kypertech.kittypissy.model.UserInfo;
import com.kypertech.kittypissy.service.PaymentService;
import com.kypertech.kittypissy.service.UserService;

@RestController
public class PaymentController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PaymentService paymentService;
	
	@PostMapping("/payment")
	public Object payment(@RequestHeader HttpHeaders requestHeaders, @RequestBody Map<String, Object> body) {
		String name = (String) body.get("name");
		String surname = (String) body.get("surname");
		String email = (String) body.get("email");
		String phone = (String) body.get("phone");
		String country = (String) body.get("country");
		String zipcode = (String) body.get("zipcode");
		String adress = (String) body.get("adress");
		String idendityNo = (String) body.get("idendityNo");
		String cardNumber = (String) body.get("cardNumber");
		String holderName = (String) body.get("holderName");
		String expireMonth = (String) body.get("expireMonth");
		String expireYear = (String) body.get("expireYear");
		String cvc = (String) body.get("cvc");
		String price = ((Integer) body.get("price")).toString();
		
		UserInfo userInfo = userService.getUserByEmail(email);
		userInfo = userService.updateUser(userInfo, email, name, surname, phone, adress, zipcode, country, idendityNo);
		//Map<String, Object> result = paymentService.payment(userInfo, holderName, cardNumber, expireMonth, expireYear, cvc, price);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
}
