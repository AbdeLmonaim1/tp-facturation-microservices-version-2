package ma.enset.customerservice.repositories;

import ma.enset.customerservice.entities.Customer;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.*;
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
        assertThat(result).isPresent();
    }
    @Test
    public void shouldNotFindCustomerByEmail() {
        String givenEmail = "xxx@yyy.com";
        Optional<Customer> result = customerRepository.findByEmail(givenEmail);
        assertThat(result).isEmpty();
    }
    @Test
    public void shouldFindCustomerByName() {
        String keyword = "o";
        List<Customer> expected = List.of(
                Customer.builder()
                        .name("Monaim")
                        .email("monaim1@gmail.com")
                        .build(),
                Customer.builder()
                        .name("Mouad")
                        .email("mouad@gmail.com")
                        .build()
        );
        List<Customer> result = customerRepository.findByNameContainingIgnoreCase(keyword);
        assertThat(result).isNotNull();
        assertThat(result.size()).isEqualTo(expected.size());
        //At the first time we compare the two lists element by element but the id not exists in the expected list so the test will fail
//        assertThat(result).usingRecursiveComparison().isEqualTo(expected);
        //So we will ignore the id field and the test will pass
        assertThat(result).usingRecursiveComparison().ignoringFields("id").isEqualTo(expected);
    }
}