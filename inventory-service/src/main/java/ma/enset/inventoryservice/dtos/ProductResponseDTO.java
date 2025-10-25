package ma.enset.inventoryservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
public class ProductResponseDTO {
    private String id;
    private String name;
    private double price;
    private int quantity;
}
