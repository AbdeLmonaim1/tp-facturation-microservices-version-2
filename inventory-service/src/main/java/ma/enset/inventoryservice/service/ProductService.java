package ma.enset.inventoryservice.service;

import ma.enset.inventoryservice.dtos.ProductRequestDTO;
import ma.enset.inventoryservice.dtos.ProductResponseDTO;
import ma.enset.inventoryservice.exceptions.ProductNotFoundException;

import java.util.List;

public interface ProductService {
    ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO);
    List<ProductResponseDTO> getAllProducts();
    ProductResponseDTO getProductById(String id) throws ProductNotFoundException;
    ProductResponseDTO updateProduct(String id, ProductRequestDTO productRequestDTO) throws ProductNotFoundException;
    void deleteProduct(String id) throws ProductNotFoundException;
}
