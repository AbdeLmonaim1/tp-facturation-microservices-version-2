package ma.enset.billingservice.dtos;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data @Builder @ToString
@AllArgsConstructor
@NoArgsConstructor
public class BillRequestDTO {
    private Date billingDate;
    private Long customerId;
    private List<ProductItemRequestDTO> productItems;
}
