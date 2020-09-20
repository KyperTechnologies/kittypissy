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
	
	public UserInfo updateUser(UserInfo userInfo, String email, String name, String surName, String phone, String adress, String zipcode, String country, String idendityNo) {
		userInfo.setEmail(email);
		userInfo.setName(name);
		userInfo.setSurName(surName);
		userInfo.setPhone(phone);
		userInfo.setAdress(adress);
		userInfo.setZipcode(zipcode);
		userInfo.setCountry(country);
		userInfo.setIdendityNo(idendityNo);
		return userRepository.save(userInfo);
	}
	
	public UserInfo updateUserPassword(UserInfo userInfo, String oldPassword, String newPassword) {
		if (userInfo != null) {
			if (new BCryptPasswordEncoder().matches(oldPassword, userInfo.getPassword())) {
				userInfo.setPassword(new BCryptPasswordEncoder().encode(newPassword));
				return userRepository.save(userInfo);
			}
		}
		return null;
	}
}
