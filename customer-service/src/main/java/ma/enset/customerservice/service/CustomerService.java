package ma.enset.customerservice.service;

import ma.enset.customerservice.dtos.CustomerRequestDTO;
import ma.enset.customerservice.dtos.CustomerResponseDTO;
import ma.enset.customerservice.exceptions.CustomerNotFoundException;

import java.util.List;

public interface CustomerService {
    CustomerResponseDTO createCustomer(CustomerRequestDTO customerRequestDTO);
    CustomerResponseDTO getCustomerById(Long id) throws CustomerNotFoundException;
    List<CustomerResponseDTO> getAllCustomers();
    void deleteCustomer(Long id) throws CustomerNotFoundException;
    CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO customerRequestDTO) throws CustomerNotFoundException;

}
