package csd230.controllers;
import csd230.entities.PhoneEntity;
import csd230.repositories.PhoneRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/rest/phones") @CrossOrigin(origins = "*")
public class PhoneRestController {
    private final PhoneRepository repo;
    public PhoneRestController(PhoneRepository repo) { this.repo = repo; }

    @GetMapping public List<PhoneEntity> all() { return repo.findAll(); }
    @PostMapping public PhoneEntity create(@RequestBody PhoneEntity p) { return repo.save(p); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { repo.deleteById(id); }
    @PutMapping("/{id}")
    public ResponseEntity<PhoneEntity> update(@PathVariable Long id, @RequestBody PhoneEntity details) {
        return repo.findById(id).map(p -> {
            p.setBrand(details.getBrand());
            p.setPrice(details.getPrice());
            p.setStorage(details.getStorage());
            return ResponseEntity.ok(repo.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }
}