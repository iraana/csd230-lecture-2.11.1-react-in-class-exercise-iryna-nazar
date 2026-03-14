package csd230.entities;
import jakarta.persistence.Entity;

@Entity
public abstract class ElectronicDeviceEntity extends ProductEntity {
    private String brand;

    public ElectronicDeviceEntity() {}
    public ElectronicDeviceEntity(String brand, Double price) {
        this.brand = brand;
        this.setPrice(price);
    }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
}