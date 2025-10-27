package ma.enset.billingservice.model;

import lombok.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Builder @ToString
public class Product {
    private String id;
    private String name;
    private double price;
    private int quantity;
}
