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
        // Check if DATABASE_URL is set (Railway format: postgresql://user:pass@host:port/db)
        String databaseUrl = System.getenv("DATABASE_URL");
        
        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            try {
                // Parse Railway's DATABASE_URL format: postgresql://user:password@host:port/database
                URI dbUri = new URI(databaseUrl);
                
                String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ":" + dbUri.getPort() + dbUri.getPath();
                String dbUser = dbUri.getUserInfo().split(":")[0];
                String dbPassword = dbUri.getUserInfo().split(":")[1];
                
                return DataSourceBuilder.create()
                        .driverClassName("org.postgresql.Driver")
                        .url(dbUrl)
                        .username(dbUser)
                        .password(dbPassword)
                        .build();
            } catch (Exception e) {
                // Fall back to application.properties configuration
                System.err.println("Failed to parse DATABASE_URL, using application.properties: " + e.getMessage());
            }
        }
        
        // Use application.properties configuration (for local development)
        return DataSourceBuilder.create()
                .driverClassName("org.postgresql.Driver")
                .url(datasourceUrl.isEmpty() ? "jdbc:postgresql://localhost:5432/food_waste" : datasourceUrl)
                .username(username.isEmpty() ? "foodsystem" : username)
                .password(password.isEmpty() ? "foodsystempass" : password)
                .build();
    }
}

