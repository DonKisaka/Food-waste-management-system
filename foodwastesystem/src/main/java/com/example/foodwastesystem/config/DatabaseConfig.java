package com.example.foodwastesystem.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url:}")
    private String datasourceUrl;

    @Value("${spring.datasource.username:}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            try {
                URI dbUri = new URI(databaseUrl);
                
                String host = dbUri.getHost();
                int port = dbUri.getPort() == -1 ? 5432 : dbUri.getPort();
                String path = dbUri.getPath();
                if (path != null && path.startsWith("/")) {
                    path = path.substring(1);
                }
                
                String dbUrl = "jdbc:postgresql://" + host + ":" + port + "/" + path;
                
                String userInfo = dbUri.getUserInfo();
                if (userInfo != null && userInfo.contains(":")) {
                    String[] credentials = userInfo.split(":", 2);
                    String dbUser = credentials[0];
                    String dbPassword = credentials[1];
                    
                    return DataSourceBuilder.create()
                            .driverClassName("org.postgresql.Driver")
                            .url(dbUrl)
                            .username(dbUser)
                            .password(dbPassword)
                            .build();
                }
            } catch (Exception e) {
                System.err.println("Failed to parse DATABASE_URL, using application.properties: " + e.getMessage());
            }
        }
        
        return DataSourceBuilder.create()
                .driverClassName("org.postgresql.Driver")
                .url(datasourceUrl.isEmpty() ? "jdbc:postgresql://localhost:5432/food_waste" : datasourceUrl)
                .username(username.isEmpty() ? "foodsystem" : username)
                .password(password.isEmpty() ? "foodsystempass" : password)
                .build();
    }
}

