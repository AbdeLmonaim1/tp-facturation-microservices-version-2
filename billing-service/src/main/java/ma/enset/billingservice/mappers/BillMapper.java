package ma.enset.billingservice.mappers;

import ma.enset.billingservice.dtos.BillRequestDTO;
import ma.enset.billingservice.dtos.BillResponseDTO;
import ma.enset.billingservice.entities.Bill;
import ma.enset.billingservice.entities.ProductItem;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ProductItemMapper.class})
public interface BillMapper {
    @Mapping(target = "customer", ignore = true)
    Bill toEntity(BillRequestDTO billRequestDTO);
    List<Bill> toEntityList(List<BillRequestDTO> dtos);
    @Mapping(target = "customer", expression = "java(customerResolver.resolve(bill.getCustomerId()))")
    @Mapping(target = "productItems", source = "productItems")
    BillResponseDTO toResponseDTO(Bill bill, @Context CustomerResolver customerResolver, @Context ProductResolver productResolver);

    List<BillResponseDTO> toResponseDTOList(List<Bill> bills, @Context CustomerResolver customerResolver, @Context ProductResolver productResolver);

    @AfterMapping
    default void linkBillAndItems(@MappingTarget Bill bill) {
        if (bill.getProductItems() != null) {
            for (ProductItem item : bill.getProductItems()) {
                item.setBill(bill);
            }
        }
    }
}
