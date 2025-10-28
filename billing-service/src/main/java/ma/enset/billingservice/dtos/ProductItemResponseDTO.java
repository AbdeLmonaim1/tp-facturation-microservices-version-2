package ma.enset.billingservice.dtos;

import lombok.*;
import ma.enset.billingservice.model.Product;


@NoArgsConstructor @AllArgsConstructor @Data @Builder @ToString
public class ProductItemResponseDTO {
    private Long id;
    private String productId;
    private double unitPrice;
    private int quantity;
    private Product product;
}
