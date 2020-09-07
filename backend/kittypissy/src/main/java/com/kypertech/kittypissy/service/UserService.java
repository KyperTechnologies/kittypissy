package com.kypertech.kittypissy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.kypertech.kittypissy.model.UserInfo;
import com.kypertech.kittypissy.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public UserInfo getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public UserInfo getUserByEmailAndPassword(String email, String password) {
		UserInfo userInfo = getUserByEmail(email);
		
		if (userInfo != null) {
			if (new BCryptPasswordEncoder().matches(password, userInfo.getPassword())) {
				return userInfo;
			}
		}
		return null;
	}
	
	public UserInfo addUser(UserInfo userInfo) {
		return userRepository.save(userInfo);
	}
	
	public UserInfo updateUser(UserInfo userInfo, String email, String name, String surName, String phone, String password, String adress) {
		userInfo.setEmail(email);
		userInfo.setName(name);
		userInfo.setSurName(surName);
		userInfo.setPassword(new BCryptPasswordEncoder().encode(password));
		userInfo.setPhone(phone);
		userInfo.setAdress(adress);
		return userRepository.save(userInfo);
	}
}
