package csd230.controllers;
import csd230.entities.MagazineEntity;
import csd230.repositories.MagazineRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/magazines")
@CrossOrigin(origins = "http://localhost:5173")
public class MagazineController {
    private final MagazineRepository magazineRepository;

    public MagazineController(MagazineRepository magazineRepository) {
        this.magazineRepository = magazineRepository;
    }

    @GetMapping public List<MagazineEntity> getAll() { return magazineRepository.findAll(); }

    @PostMapping public MagazineEntity create(@RequestBody MagazineEntity mag) { return magazineRepository.save(mag); }

    @PutMapping("/{id}")
    public ResponseEntity<MagazineEntity> update(@PathVariable Long id, @RequestBody MagazineEntity details) {
        return magazineRepository.findById(id).map(mag -> {
            mag.setTitle(details.getTitle());
            mag.setPrice(details.getPrice());
            mag.setOrderQty(details.getOrderQty());
            mag.setCurrentIssue(details.getCurrentIssue());
            return ResponseEntity.ok(magazineRepository.save(mag));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        magazineRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}