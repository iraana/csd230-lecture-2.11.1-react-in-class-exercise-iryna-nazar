package csd230.repositories;

import csd230.entities.MagazineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MagazineEntityRepository extends JpaRepository<MagazineEntity, Long> {
}