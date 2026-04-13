package csd230.repositories;

import csd230.entities.PhoneEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhoneRepository extends JpaRepository<PhoneEntity, Long> {
    List<PhoneEntity> findByBrand(String brand);
}