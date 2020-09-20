package com.kypertech.kittypissy.controller;

import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.kypertech.kittypissy.utils.SendMail;

@RestController
public class MailController {
	
	@Autowired
	private SendMail sendMail;
	
	@PostMapping("/sendMail")
	public Object sendMail(@RequestHeader HttpHeaders header, @RequestBody Map<String, Object> body) {
		String email = (String) body.get("email");
		String introduction = (String) body.get("introduction");
		String name = (String) body.get("name");
		String phone = (String) body.get("phone");
		String subject = (String) body.get("subject");
		 
		boolean status = false;
		try {
			status = sendMail.sendMailSmtp(email, introduction, name, phone, subject);
		} catch (AddressException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (status) {
			return new ResponseEntity<>(status, HttpStatus.OK);
		}
		return new ResponseEntity<>("Mail send failed", HttpStatus.BAD_REQUEST);
	}
}
