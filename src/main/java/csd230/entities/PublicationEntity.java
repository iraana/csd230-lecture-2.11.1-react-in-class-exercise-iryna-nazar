package csd230.entities;
import jakarta.persistence.Entity;

@Entity
public abstract class PublicationEntity extends ProductEntity {
    private String title;
    private Integer copies; // Object Integer avoids "null into int" crash

    public PublicationEntity() {}
    public PublicationEntity(String t, Double p, Integer c) {
        this.title = t;
        this.setPrice(p);
        this.copies = c;
    }
    public String getTitle() { return title; }
    public void setTitle(String t) { this.title = t; }
    public Integer getCopies() { return copies; }
    public void setCopies(Integer c) { this.copies = c; }
    @Override public void sellItem() { if (copies > 0) copies--; }
}