package ma.enset.billingservice.model;

import lombok.*;

@Getter @Setter
@Builder @ToString
@NoArgsConstructor @AllArgsConstructor
public class Customer {
    private Long id;
    private String name;
    private String email;
}
