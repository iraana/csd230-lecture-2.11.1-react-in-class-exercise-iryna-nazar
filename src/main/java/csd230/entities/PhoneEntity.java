package csd230.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.util.Objects;

@Entity
@DiscriminatorValue("PHONE")
public class PhoneEntity extends ElectronicDeviceEntity {
    private int storage; // GB

    public PhoneEntity() {}
    public PhoneEntity(String brand, double price, int storage) {
        super(brand, price);
        this.storage = storage;
    }

    public int getStorage() { return storage; }
    public void setStorage(int storage) { this.storage = storage; }

    @Override
    public void sellItem() { System.out.println("Sold Phone: " + getBrand()); }
}