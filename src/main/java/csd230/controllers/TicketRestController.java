package csd230.controllers;

import csd230.entities.TicketEntity;
import csd230.repositories.TicketRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rest/tickets")
@CrossOrigin(origins = "*")
public class TicketRestController {
    private final TicketRepository repo;
    public TicketRestController(TicketRepository repo) { this.repo = repo; }

    @GetMapping public List<TicketEntity> all() { return repo.findAll(); }

    @PostMapping public TicketEntity create(@RequestBody TicketEntity t) { return repo.save(t); }

    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { repo.deleteById(id); }

    @PutMapping("/{id}")
    public ResponseEntity<TicketEntity> update(@PathVariable Long id, @RequestBody TicketEntity details) {
        return repo.findById(id).map(t -> {
            t.setDescription(details.getDescription());
            t.setPrice(details.getPrice()); // Now correctly hits the database column
            return ResponseEntity.ok(repo.save(t));
        }).orElse(ResponseEntity.notFound().build());
    }
}