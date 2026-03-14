package csd230.entities;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDateTime;

@Entity @DiscriminatorValue("MAGAZINE")
public class MagazineEntity extends PublicationEntity {
    private Integer orderQty;
    private LocalDateTime currentIssue;

    public MagazineEntity() {}
    public MagazineEntity(String t, Double p, Integer c, Integer o, LocalDateTime d) {
        super(t, p, c);
        this.orderQty = o;
        this.currentIssue = d;
    }
    public Integer getOrderQty() { return orderQty; }
    public void setOrderQty(Integer o) { this.orderQty = o; }
    public LocalDateTime getCurrentIssue() { return currentIssue; }
    public void setCurrentIssue(LocalDateTime d) { this.currentIssue = d; }
}