package ma.enset.billingservice.service;


import ma.enset.billingservice.dtos.BillRequestDTO;
import ma.enset.billingservice.dtos.BillResponseDTO;
import ma.enset.billingservice.exceptions.CustomerNotFoundException;
import ma.enset.billingservice.exceptions.ProductNotFoundException;

import java.util.List;

public interface BillService {
    BillResponseDTO createBill(BillRequestDTO billRequestDTO) throws ProductNotFoundException, CustomerNotFoundException;
    BillResponseDTO getBillById(Long id);
    List<BillResponseDTO> getAllBills();
    BillResponseDTO updateBill(Long id,BillRequestDTO billRequestDTO);
    void deleteBill(Long id);
}
