package csd230.repositories;

import csd230.entities.DiscMagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscMagRepository extends JpaRepository<DiscMagEntity, Long> {
    List<DiscMagEntity> findByHasDisc(boolean hasDisc);
}