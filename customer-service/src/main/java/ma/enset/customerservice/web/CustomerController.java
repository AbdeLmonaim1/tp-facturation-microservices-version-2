package ma.enset.customerservice.web;

import lombok.AllArgsConstructor;
import ma.enset.customerservice.dtos.CustomerRequestDTO;
import ma.enset.customerservice.dtos.CustomerResponseDTO;
import ma.enset.customerservice.exceptions.CustomerNotFoundException;
import ma.enset.customerservice.service.CustomerService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@AllArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public CustomerResponseDTO createCustomer(@RequestBody CustomerRequestDTO customerRequestDTO) {
        return customerService.createCustomer(customerRequestDTO);
    }
    @GetMapping
    public List<CustomerResponseDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }
    @GetMapping("/{id}")
    public CustomerResponseDTO getCustomerById(@PathVariable Long id) throws CustomerNotFoundException {
        return customerService.getCustomerById(id);
    }
    @PutMapping("/{id}")
    public CustomerResponseDTO updateCustomer(@PathVariable Long id, @RequestBody CustomerRequestDTO customerRequestDTO) throws CustomerNotFoundException {
        return customerService.updateCustomer(id, customerRequestDTO);
    }
    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) throws CustomerNotFoundException {
        customerService.deleteCustomer(id);
    }
}
