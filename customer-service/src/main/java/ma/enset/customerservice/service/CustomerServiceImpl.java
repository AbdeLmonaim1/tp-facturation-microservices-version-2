package ma.enset.customerservice.service;

import lombok.extern.slf4j.Slf4j;
import ma.enset.customerservice.dtos.CustomerRequestDTO;
import ma.enset.customerservice.dtos.CustomerResponseDTO;
import ma.enset.customerservice.entities.Customer;
import ma.enset.customerservice.exceptions.CustomerNotFoundException;
import ma.enset.customerservice.exceptions.EmailAlreadyExistException;
import ma.enset.customerservice.mappers.CustomerMapper;
import ma.enset.customerservice.repositories.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public CustomerServiceImpl(CustomerRepository customerRepository, CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }

    @Override
    public CustomerResponseDTO createCustomer(CustomerRequestDTO customerRequestDTO) throws EmailAlreadyExistException {
        log.info(String.format("Saving new Customer => %s ", customerRequestDTO.toString()));
        Optional<Customer> byEmail = customerRepository.findByEmail(customerRequestDTO.getEmail());
        if(customerRequestDTO == null){
            throw new IllegalArgumentException("CustomerRequestDTO cannot be null");
        }
        if(byEmail.isPresent()) {
            log.error(String.format("This email %s already exist", customerRequestDTO.getEmail()));
            throw new EmailAlreadyExistException();
        }
        Customer customer = customerMapper.toEntity(customerRequestDTO);
        customer = customerRepository.save(customer);
        return customerMapper.toDto(customer);
    }

    @Override
    public CustomerResponseDTO getCustomerById(Long id) throws CustomerNotFoundException {
        Customer customer = customerRepository.findById(id).orElseThrow(()-> new CustomerNotFoundException("Customer not found with id: " + id));
        return customerMapper.toDto(customer);
    }

    @Override
    public List<CustomerResponseDTO> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream().map(customerMapper::toDto).collect(Collectors.toList());
    }
    @Override
    public List<CustomerResponseDTO> searchCustomers(String keyword) {
        List<Customer> customers = customerRepository.findByNameContainingIgnoreCase(keyword);
        return customerMapper.toDtoList(customers);
    }

    @Override
    public void deleteCustomer(Long id) throws CustomerNotFoundException {
        Customer customer = customerRepository.findById(id).orElseThrow(()-> new CustomerNotFoundException("Customer not found with id: " + id));
        customerRepository.delete(customer);
    }

    @Override
    public CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO customerRequestDTO) throws CustomerNotFoundException {
        Customer customer = customerRepository.findById(id).orElseThrow(()-> new CustomerNotFoundException("Customer not found with id: " + id));
        customer.setName(customerRequestDTO.getName());
        customer.setEmail(customerRequestDTO.getEmail());
        customer = customerRepository.save(customer);
        return customerMapper.toDto(customer);
    }
}
