package ma.enset.billingservice.mappers;

import lombok.RequiredArgsConstructor;
import ma.enset.billingservice.feign.CustomerRestClient;
import ma.enset.billingservice.model.Customer;
import org.springframework.stereotype.Component;

@Component
public class CustomerResolver {
    private final CustomerRestClient customerRestClient;

    public CustomerResolver(CustomerRestClient customerRestClient) {
        this.customerRestClient = customerRestClient;
    }
    Customer resolve(Long customerId){
        return customerRestClient.getCustomerById(customerId);
    }

}
