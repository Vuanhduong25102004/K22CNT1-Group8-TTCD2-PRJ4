package com.example.QL_Cuahang_ZARA;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication //(exclude = { SecurityAutoConfiguration.class })
public class QlCuahangZaraApplication {
	public static void main(String[] args) {
		SpringApplication.run(QlCuahangZaraApplication.class, args);
	}

}
