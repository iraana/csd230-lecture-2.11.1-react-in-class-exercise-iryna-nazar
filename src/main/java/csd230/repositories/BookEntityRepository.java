package csd230.repositories;

import csd230.entities.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookEntityRepository extends JpaRepository<BookEntity, Long> {

    // We can now add book-specific queries here if needed, e.g.:

    // List<BookEntity> findByAuthor(String author);

}
