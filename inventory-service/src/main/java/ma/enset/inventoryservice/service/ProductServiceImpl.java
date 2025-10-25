package ma.enset.inventoryservice.service;

import ma.enset.inventoryservice.dtos.ProductRequestDTO;
import ma.enset.inventoryservice.dtos.ProductResponseDTO;
import ma.enset.inventoryservice.entities.Product;
import ma.enset.inventoryservice.exceptions.ProductNotFoundException;
import ma.enset.inventoryservice.mappers.ProductMapper;
import ma.enset.inventoryservice.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) {
      if(productRequestDTO == null){
            throw new IllegalArgumentException("product cannot be null");
        }
        Product product = productMapper.toEntity(productRequestDTO);
        product.setId(UUID.randomUUID().toString());
        product = productRepository.save(product);
        return productMapper.toDTO(product);
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(productMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO getProductById(String id) throws ProductNotFoundException {
        Product product = productRepository.findById(id).orElseThrow(()-> new ProductNotFoundException("Product not found with id: " + id));
        return productMapper.toDTO(product);
    }

    @Override
    public ProductResponseDTO updateProduct(String id, ProductRequestDTO productRequestDTO) throws ProductNotFoundException {
        Product product = productRepository.findById(id).orElseThrow(()-> new ProductNotFoundException("Product not found with id: " + id));
        if (productRequestDTO.getName()!=null) product.setName(productRequestDTO.getName());
        if (productRequestDTO.getPrice()!=0.0) product.setPrice(productRequestDTO.getPrice());
        if (productRequestDTO.getQuantity()!=0) product.setQuantity(productRequestDTO.getQuantity());
        product = productRepository.save(product);
        return productMapper.toDTO(product);
    }

    @Override
    public void deleteProduct(String id) throws ProductNotFoundException {
        Product product = productRepository.findById(id).orElseThrow(()-> new ProductNotFoundException("Product not found with id: " + id));
        productRepository.delete(product);
    }
}
