package com.kypertech.kittypissy.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.iyzipay.Options;
import com.iyzipay.model.Address;
import com.iyzipay.model.BasketItem;
import com.iyzipay.model.BasketItemType;
import com.iyzipay.model.Buyer;
import com.iyzipay.model.Currency;
import com.iyzipay.model.Locale;
import com.iyzipay.model.Payment;
import com.iyzipay.model.PaymentCard;
import com.iyzipay.model.PaymentChannel;
import com.iyzipay.model.PaymentGroup;
import com.iyzipay.request.CreatePaymentRequest;
import com.kypertech.kittypissy.model.UserInfo;

@Service
public class PaymentService {
	
	@Value("${iyzico.api.key}")
	private String iyzicoApiKey;
	
	@Value("${iyzico.secret.key}")
	private String iyzicoSecretKey;
	
	@Value("${iyzico.base.url}")
	private String iyzicoBaseUrl;
	
	@Value("${iyzico.conversation.id}")
	private String conversationId;
	
	public Map<String, Object> payment(UserInfo userInfo, String holderName, String cardNumber, String expireMonth, String expireYear, String cvc, String price) {
		Options options = new Options();
		options.setApiKey(iyzicoApiKey);
		options.setSecretKey(iyzicoSecretKey);
		options.setBaseUrl(iyzicoBaseUrl);

		CreatePaymentRequest request = new CreatePaymentRequest();
		request.setLocale(Locale.TR.getValue());
		request.setConversationId(conversationId);
		request.setPrice(new BigDecimal(price));
		request.setPaidPrice(new BigDecimal(price));
		request.setCurrency(Currency.TRY.name());
		request.setInstallment(1);
		request.setBasketId("B67832");
		request.setPaymentChannel(PaymentChannel.WEB.name());
		request.setPaymentGroup(PaymentGroup.PRODUCT.name());

		PaymentCard paymentCard = new PaymentCard();
		paymentCard.setCardHolderName("John Doe");
		paymentCard.setCardNumber("5528790000000008");
		paymentCard.setExpireMonth("12");
		paymentCard.setExpireYear("2030");
		paymentCard.setCvc("123");
		paymentCard.setRegisterCard(0);
		request.setPaymentCard(paymentCard);
		
		/*PaymentCard paymentCard = new PaymentCard();
		paymentCard.setCardHolderName(holderName);
		paymentCard.setCardNumber(cardNumber);
		paymentCard.setExpireMonth(expireMonth);
		paymentCard.setExpireYear(expireYear);
		paymentCard.setCvc(cvc);
		paymentCard.setRegisterCard(0);
		request.setPaymentCard(paymentCard);*/
		
		Buyer buyer = new Buyer();
		buyer.setId(userInfo.getId().toString());
		buyer.setName(userInfo.getName());
		buyer.setSurname(userInfo.getSurName());
		buyer.setGsmNumber(userInfo.getPhone());
		buyer.setEmail(userInfo.getEmail());
		buyer.setIdentityNumber(userInfo.getIdendityNo());
		buyer.setRegistrationAddress(userInfo.getAdress());
		buyer.setCity(userInfo.getCountry());
		buyer.setCountry("Turkey");
		buyer.setZipCode(userInfo.getZipcode());
		request.setBuyer(buyer);

		Address shippingAddress = new Address();
		shippingAddress.setContactName(userInfo.getName() + userInfo.getSurName());
		shippingAddress.setCity(userInfo.getCountry());
		shippingAddress.setCountry("Turkey");
		shippingAddress.setAddress(userInfo.getAdress());
		shippingAddress.setZipCode(userInfo.getZipcode());
		request.setShippingAddress(shippingAddress);

		Payment payment = Payment.create(request, options);
		
		Map<String, Object> result = new LinkedHashMap<String, Object>();
		result.put("status", payment.getStatus());
		result.put("conversationId", payment.getConversationId());
		result.put("errorCode", payment.getErrorCode());
		result.put("errorMessage", payment.getErrorMessage());
		result.put("errorGroup", payment.getErrorGroup());
		return result;
	}
}
