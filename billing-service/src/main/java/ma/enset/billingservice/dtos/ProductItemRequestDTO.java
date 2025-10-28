package ma.enset.billingservice.dtos;

import lombok.*;


@NoArgsConstructor @AllArgsConstructor @Data @Builder @ToString
public class ProductItemRequestDTO {
    private String productId;
    private double unitPrice;
    private int quantity;
}
