package csd230.entities;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "products")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "product_type", discriminatorType = DiscriminatorType.STRING)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "productType", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = BookEntity.class, name = "BookEntity"),
        @JsonSubTypes.Type(value = MagazineEntity.class, name = "MagazineEntity"),
        @JsonSubTypes.Type(value = LaptopEntity.class, name = "LaptopEntity")
})
public abstract class ProductEntity implements Serializable, SaleableItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double price; // Object Double avoids the "null into double" crash

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getProductType() { return this.getClass().getSimpleName(); }
}