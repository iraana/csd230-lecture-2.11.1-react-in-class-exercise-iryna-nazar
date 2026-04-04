package csd230.controllers;

import csd230.entities.BookEntity;
import csd230.repositories.BookEntityRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Book REST API", description = "JSON API for managing books")
@RestController
@RequestMapping("/api/rest/books")
@CrossOrigin(origins = "*")
public class BookRestController {
    private final BookEntityRepository bookRepository;

    public BookRestController(BookEntityRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Operation(summary = "Get all books as JSON")
    @GetMapping
    public List<BookEntity> all() {
        return bookRepository.findAll();
    }

    @Operation(summary = "Get a single book by ID")
    @GetMapping("/{id}")
    public BookEntity getBook(@PathVariable Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    @Operation(summary = "Create a new book")
    @PostMapping
    public BookEntity newBook(@RequestBody BookEntity newBook) {
        return bookRepository.save(newBook);
    }

    @Operation(summary = "Update or Replace a book")
    @PutMapping("/{id}")
    public ResponseEntity<BookEntity> replaceBook(@RequestBody BookEntity newBook, @PathVariable Long id) {
        return bookRepository.findById(id)
                .map(book -> {
                    book.setTitle(newBook.getTitle());
                    book.setAuthor(newBook.getAuthor());
                    book.setPrice(newBook.getPrice()); // This updates the price!
                    book.setCopies(newBook.getCopies());
                    return ResponseEntity.ok(bookRepository.save(book));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Delete a book")
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}

