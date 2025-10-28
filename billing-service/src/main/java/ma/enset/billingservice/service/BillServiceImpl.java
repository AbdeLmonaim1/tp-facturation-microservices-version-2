package ma.enset.billingservice.service;

import lombok.AllArgsConstructor;
import ma.enset.billingservice.dtos.BillRequestDTO;
import ma.enset.billingservice.dtos.BillResponseDTO;
import ma.enset.billingservice.entities.Bill;
import ma.enset.billingservice.entities.ProductItem;
import ma.enset.billingservice.exceptions.CustomerNotFoundException;
import ma.enset.billingservice.exceptions.ProductNotFoundException;
import ma.enset.billingservice.feign.CustomerRestClient;
import ma.enset.billingservice.feign.ProductRestClient;
import ma.enset.billingservice.mappers.BillMapper;
import ma.enset.billingservice.mappers.CustomerResolver;
import ma.enset.billingservice.mappers.ProductResolver;
import ma.enset.billingservice.model.Customer;
import ma.enset.billingservice.model.Product;
import ma.enset.billingservice.repositories.BillRepository;
import ma.enset.billingservice.repositories.ProductItemRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
@Service
@AllArgsConstructor
public class BillServiceImpl implements BillService {
    private final BillRepository billRepository;
    private final BillMapper billMapper;
    private final ProductItemRepository productItemRepository;
    private final ProductRestClient productRestClient;
    private final CustomerRestClient customerRestClient;
    private final CustomerResolver customerResolver;
    private final ProductResolver productResolver;
    @Override
    public BillResponseDTO createBill(BillRequestDTO billRequestDTO) throws ProductNotFoundException, CustomerNotFoundException {
        Bill bill = billMapper.toEntity(billRequestDTO);
        bill.setBillingDate(billRequestDTO.getBillingDate()==null?new Date():billRequestDTO.getBillingDate());
        for (ProductItem productItem : bill.getProductItems()) {
            Product product = productRestClient.getProductById(productItem.getProductId());
            if (product == null) throw new ProductNotFoundException("Product not found with id: " + productItem.getProductId());
            productItem.setQuantity(product.getQuantity());
            productItem.setBill(bill);
            productItemRepository.save(productItem);
        }
        Customer customer = customerRestClient.getCustomerById(bill.getCustomerId());
        if (customer == null) throw new CustomerNotFoundException("Customer not found with id: " + bill.getCustomerId());
        bill.setCustomerId(customer.getId());
        billRepository.save(bill);
        return billMapper.toResponseDTO(bill,customerResolver,productResolver);
    }

    @Override
    public BillResponseDTO getBillById(Long id) {
        return null;
    }

    @Override
    public List<BillResponseDTO> getAllBills() {
        return List.of();
    }

    @Override
    public BillResponseDTO updateBill(Long id, BillRequestDTO billRequestDTO) {
        return null;
    }

    @Override
    public void deleteBill(Long id) {

    }
}
