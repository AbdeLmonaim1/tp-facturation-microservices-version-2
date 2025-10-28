package ma.enset.billingservice.mappers;

import ma.enset.billingservice.dtos.ProductItemRequestDTO;
import ma.enset.billingservice.dtos.ProductItemResponseDTO;
import ma.enset.billingservice.entities.ProductItem;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", imports = {ProductResolver.class})
public interface ProductItemMapper {
    @Mapping(target = "bill", ignore = true)
    ProductItem toEntity(ProductItemRequestDTO productItemRequestDTO);
    List<ProductItem> toEntityList(List<ProductItemRequestDTO> dtos);
    @Mapping(target = "product", expression = "java(productResolver.resolve(item.getProductId()))")
    ProductItemResponseDTO toResponseDTO(ProductItem item, @Context ProductResolver productResolver);
    List<ProductItemResponseDTO> toResponseDTOList(List<ProductItem> items, @Context ProductResolver productResolver);
}
