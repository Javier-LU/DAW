package com.ESAD.ESAD;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EsadApplication {

	@Value("${security.jwt.key.private}")
	private String secretKey;

	@Value("${security.jwt.user.backend}")
	private String userGenerator;

	@Value("${security.jwt.time.expiration}")
	private long timeExpiration;

	public static void main(String[] args) {
		SpringApplication.run(EsadApplication.class, args);
	}
	@Bean
	public CommandLineRunner run() {
		return args -> {
			System.out.println("Secret Key: " + secretKey);
			System.out.println("User Generator: " + userGenerator);
			System.out.println("Time Expiration: " + timeExpiration);
		};
	}
}
