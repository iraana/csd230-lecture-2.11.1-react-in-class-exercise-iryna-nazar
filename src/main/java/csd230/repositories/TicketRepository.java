package csd230.repositories;

import csd230.entities.TicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<TicketEntity, Long> {
    List<TicketEntity> findByDescription(String description);

    List<TicketEntity> findByDescriptionLike(String description);
}