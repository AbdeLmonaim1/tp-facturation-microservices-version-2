package ma.enset.inventoryservice.web;

import lombok.AllArgsConstructor;
import ma.enset.inventoryservice.dtos.ProductRequestDTO;
import ma.enset.inventoryservice.dtos.ProductResponseDTO;
import ma.enset.inventoryservice.exceptions.ProductNotFoundException;
import ma.enset.inventoryservice.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;
    @PostMapping
    public ProductResponseDTO createProduct(@RequestBody ProductRequestDTO productRequestDTO) {
        return productService.createProduct(productRequestDTO);
    }
    @GetMapping
    public List<ProductResponseDTO> getAllProducts() {
        return productService.getAllProducts();
    }
    @GetMapping("/{id}")
    public ProductResponseDTO getProduct(@PathVariable String id) throws ProductNotFoundException {
        return productService.getProductById(id);
    }
    @PutMapping("/{id}")
    public ProductResponseDTO updateProduct(@PathVariable String id,@RequestBody ProductRequestDTO productRequestDTO) throws ProductNotFoundException {
        return productService.updateProduct(id, productRequestDTO);
    }
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) throws ProductNotFoundException {
        productService.deleteProduct(id);
    }
}

