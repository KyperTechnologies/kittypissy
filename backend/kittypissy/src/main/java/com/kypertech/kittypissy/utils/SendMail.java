package com.kypertech.kittypissy.utils;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Component;

@Component
public class SendMail {
	
	public boolean sendMailSmtp(String email, String introduction, String name, String phone, String subject) throws AddressException, MessagingException {
		final String username = "kittypissy118@gmail.com";
        final String password = "hsacnkr118";

        Properties prop = new Properties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true"); //TLS

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(email));
        message.setRecipients(
                Message.RecipientType.TO,
                InternetAddress.parse("kittypissy118@gmail.com")
        );
        String text = "Email: " + email + "\n" +
        			  "Telefon:	 " + phone + "\n" +
        			  "Isim: " + name + "\n" + 
        			  "Mail Icerigi: " + introduction;
        
        message.setSubject(subject);
        message.setText(text);
        Transport.send(message);
        return true;
	}
}
