package com.assetmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.assetmanagement.Repository")
public class AssetManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(AssetManagementApplication.class, args);
    }
}