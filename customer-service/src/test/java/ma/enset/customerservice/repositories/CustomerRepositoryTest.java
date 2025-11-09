package ma.enset.customerservice.repositories;

import ma.enset.customerservice.entities.Customer;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
//Inject all the spring data jpa things
@DataJpaTest
class CustomerRepositoryTest {
    @Autowired
    private CustomerRepository customerRepository;

    //Before each test save a customer in the database
    @BeforeEach
    public void setUp() {
        customerRepository.save(Customer.builder()
                        .name("Monaim")
                        .email("monaim1@gmail.com")
                .build());
        customerRepository.save(Customer.builder()
                .name("Amine")
                .email("amine@gmail.com")
                .build());
        customerRepository.save(Customer.builder()
                .name("Mouad")
                .email("mouad@gmail.com")
                .build());
    }
    @Test
    public void shouldFindCustomerByEmail() {
        String givenEmail = "monaim1@gmail.com";
        Optional<Customer> result = customerRepository.findByEmail(givenEmail);
        AssertionsForClassTypes.assertThat(result).isPresent();
    }
}