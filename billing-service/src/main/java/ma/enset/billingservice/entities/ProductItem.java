package ma.enset.billingservice.entities;

import jakarta.persistence.*;
import lombok.*;
import ma.enset.billingservice.model.Product;

@Entity
@NoArgsConstructor @AllArgsConstructor @Data @Builder @ToString
public class ProductItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productId;
    private double unitPrice;
    private int quantity;
    @ManyToOne
    private Bill bill;
    @Transient
    private Product product;
}
