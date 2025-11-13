package ma.enset.customerservice.mappers;

import ma.enset.customerservice.dtos.CustomerRequestDTO;
import ma.enset.customerservice.dtos.CustomerResponseDTO;
import ma.enset.customerservice.entities.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;

import java.util.List;

@Mapper(componentModel = "spring"
)
public interface CustomerMapper {
    Customer toEntity(CustomerRequestDTO customerRequestDTO);
    CustomerResponseDTO toDto(Customer customer);
    List<CustomerResponseDTO> toDtoList(List<Customer> customers);
}
