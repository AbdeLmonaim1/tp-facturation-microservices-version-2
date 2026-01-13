package ma.enset.inventoryservice;

import ma.enset.inventoryservice.entities.Product;
import ma.enset.inventoryservice.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.UUID;

@SpringBootApplication
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner start(ProductRepository repository) {
        return args -> {
            repository.save(new Product(UUID.randomUUID().toString(), "Samsung S25 Ultra", 18450.50, 22));
            repository.save(new Product(UUID.randomUUID().toString(), "Iphone 17 Pro Max", 16500.50, 34));
            repository.save(new Product(UUID.randomUUID().toString(), "Smart TV", 5005, 56));
        };
    }
}
