package csd230.entities;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity @DiscriminatorValue("LAPTOP")
public class LaptopEntity extends ElectronicDeviceEntity {
    private Integer ramSize;
    public LaptopEntity() {}
    public LaptopEntity(String brand, Double price, Integer ramSize) {
        super(brand, price);
        this.ramSize = ramSize;
    }
    public Integer getRamSize() { return ramSize; }
    public void setRamSize(Integer ramSize) { this.ramSize = ramSize; }
    @Override public void sellItem() { System.out.println("Sold Laptop"); }
}