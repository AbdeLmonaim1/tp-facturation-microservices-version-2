package ma.enset.billingservice.mappers;

import ma.enset.billingservice.feign.ProductRestClient;
import ma.enset.billingservice.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductResolver {
    private final ProductRestClient productRestClient;

    public ProductResolver(ProductRestClient productRestClient) {
        this.productRestClient = productRestClient;
    }
    Product resolve(String productId) {
        return productRestClient.getProductById(productId);
    }
}
