package ma.enset.billingservice.dtos;

import lombok.*;
import ma.enset.billingservice.model.Customer;

import java.util.Date;
import java.util.List;

@Data @Builder @ToString
@AllArgsConstructor
@NoArgsConstructor
public class BillResponseDTO {
    private Long id;
    private Date billingDate;
    private Long customerId;
    private Customer customer;
    private List<ProductItemResponseDTO> productItems;
}
