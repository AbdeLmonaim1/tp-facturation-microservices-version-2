package ma.enset.billingservice.web;

import lombok.AllArgsConstructor;
import ma.enset.billingservice.dtos.BillRequestDTO;
import ma.enset.billingservice.dtos.BillResponseDTO;
import ma.enset.billingservice.exceptions.CustomerNotFoundException;
import ma.enset.billingservice.exceptions.ProductNotFoundException;
import ma.enset.billingservice.service.BillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
@AllArgsConstructor
public class BillingController {
    private final BillService billService;
    @PostMapping
    public BillResponseDTO createBill(@RequestBody BillRequestDTO billRequestDTO) throws ProductNotFoundException, CustomerNotFoundException {
        return billService.createBill(billRequestDTO);
    }
    @GetMapping("/{id}")
    public BillResponseDTO getBillById(@PathVariable Long id) {
        return billService.getBillById(id);
    }
    @GetMapping
    public List<BillResponseDTO> getAllBills() {
        return billService.getAllBills();
    }
}
