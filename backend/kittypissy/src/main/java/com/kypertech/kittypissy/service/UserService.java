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
		
		if (new BCryptPasswordEncoder().matches(password, userInfo.getPassword())) {
			return userInfo;
		}
		
		return null;
	}
	
	public UserInfo addUser(UserInfo userInfo) {
		return userRepository.save(userInfo);
	}
}
