package ma.enset.inventoryservice.mappers;

import ma.enset.inventoryservice.dtos.ProductRequestDTO;
import ma.enset.inventoryservice.dtos.ProductResponseDTO;
import ma.enset.inventoryservice.entities.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toEntity(ProductRequestDTO productRequestDTO);
    ProductResponseDTO toDTO(Product product);
}
