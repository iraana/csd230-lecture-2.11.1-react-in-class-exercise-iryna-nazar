package csd230.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("TICKET")
public class TicketEntity extends ProductEntity {
    private String description;

    public TicketEntity() {}

    public TicketEntity(String d, Double p) {
        this.description = d;
        this.setPrice(p); // This sets the price in the Parent class (ProductEntity)
    }

    public String getDescription() { return description; }
    public void setDescription(String d) { this.description = d; }

    @Override
    public void sellItem() {
        System.out.println("Selling Ticket: " + description);
    }
}