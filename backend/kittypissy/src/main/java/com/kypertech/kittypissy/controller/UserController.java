package com.kypertech.kittypissy.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kypertech.kittypissy.model.UserInfo;
import com.kypertech.kittypissy.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Value("${oauth2.client.username}")
	private String oauth2User;
	
	@Value("${oauth2.client.password}")
	private String oauth2Password;

	@PostMapping("/register")
	public Object register(@RequestHeader HttpHeaders requestHeaders, @RequestBody Map<String, Object> body) {
		UserInfo userInfo = new UserInfo();
		
		String name = (String) body.get("name");
		String surname = (String) body.get("surname");
		String email = (String) body.get("email");
		String password = (String) body.get("password");
		
		userInfo.setName(name);
		userInfo.setSurName(surname);
		userInfo.setEmail(email);
		userInfo.setPassword(new BCryptPasswordEncoder().encode(password));
		userInfo.setRole("User");
		
		userInfo = userService.addUser(userInfo);
		
		if (userInfo == null) {
			return new ResponseEntity<>("Kayit Basarisiz", HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public Object login(@RequestHeader HttpHeaders requestHeaders, @RequestBody Map<String, Object> body) {
		String email = (String) body.get("email");
		String password = (String) body.get("password");
		
		UserInfo userInfo = userService.getUserByEmailAndPassword(email, password);
		
		if (userInfo != null) {
			Map<String, Object> result = new LinkedHashMap<String, Object>();
			
			result.put("role", userInfo.getRole());
			result.put("oauthUsername", oauth2User);
			result.put("oauthPassword", oauth2Password);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Yanlis Email/Sifre", HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getUserDetails")
	public Object getUserDetails(@RequestHeader HttpHeaders requestHeaders, @RequestParam String userEmail) {
		UserInfo userInfo = userService.getUserByEmail(userEmail);
		
		if (userInfo != null) {
			Map<String, Object> result = new LinkedHashMap<String, Object>();
			
			result.put("name", userInfo.getName());
			result.put("surname", userInfo.getSurName());
			result.put("email", userInfo.getEmail());
			result.put("phone", userInfo.getPhone());
			result.put("adress", userInfo.getAdress());
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Yanlis Email/Sifre", HttpStatus.BAD_REQUEST);
		}
	}
	
}
