package csd230.repositories;

import csd230.entities.LaptopEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LaptopRepository extends JpaRepository<LaptopEntity, Long> {
    List<LaptopEntity> findByBrand(String brand);
}