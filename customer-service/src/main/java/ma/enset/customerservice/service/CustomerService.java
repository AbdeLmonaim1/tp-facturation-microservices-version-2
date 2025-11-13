package ma.enset.customerservice.service;

import ma.enset.customerservice.dtos.CustomerRequestDTO;
import ma.enset.customerservice.dtos.CustomerResponseDTO;
import ma.enset.customerservice.exceptions.CustomerNotFoundException;
import ma.enset.customerservice.exceptions.EmailAlreadyExistException;

import java.util.List;

public interface CustomerService {
    CustomerResponseDTO createCustomer(CustomerRequestDTO customerRequestDTO) throws EmailAlreadyExistException;
    CustomerResponseDTO getCustomerById(Long id) throws CustomerNotFoundException;
    List<CustomerResponseDTO> getAllCustomers();

    List<CustomerResponseDTO> searchCustomers(String keyword);

    void deleteCustomer(Long id) throws CustomerNotFoundException;
    CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO customerRequestDTO) throws CustomerNotFoundException;

}
