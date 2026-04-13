package csd230.controllers;
import csd230.entities.DiscMagEntity;
import csd230.repositories.DiscMagRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/rest/discmags") @CrossOrigin(origins = "*")
public class DiscMagRestController {
    private final DiscMagRepository repo;
    public DiscMagRestController(DiscMagRepository repo) { this.repo = repo; }

    @GetMapping public List<DiscMagEntity> all() { return repo.findAll(); }
    @PostMapping public DiscMagEntity create(@RequestBody DiscMagEntity d) { return repo.save(d); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { repo.deleteById(id); }
    @PutMapping("/{id}")
    public ResponseEntity<DiscMagEntity> update(@PathVariable Long id, @RequestBody DiscMagEntity details) {
        return repo.findById(id).map(d -> {
            d.setTitle(details.getTitle());
            d.setPrice(details.getPrice());
            d.setHasDisc(details.isHasDisc());
            d.setCurrentIssue(details.getCurrentIssue());
            return ResponseEntity.ok(repo.save(d));
        }).orElse(ResponseEntity.notFound().build());
    }
}