package csd230.controllers;

import csd230.entities.LaptopEntity;
import csd230.repositories.LaptopRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rest/laptops")
@CrossOrigin(origins = "http://localhost:5173")
public class LaptopController {

    private final LaptopRepository laptopRepository;

    public LaptopController(LaptopRepository laptopRepository) {
        this.laptopRepository = laptopRepository;
    }

    @GetMapping
    public List<LaptopEntity> getAll() {
        return laptopRepository.findAll();
    }

    @PostMapping
    public LaptopEntity create(@RequestBody LaptopEntity laptop) {
        return laptopRepository.save(laptop);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LaptopEntity> update(@PathVariable Long id, @RequestBody LaptopEntity details) {
        return laptopRepository.findById(id).map(laptop -> {
            // Update fields from ElectronicDeviceEntity (Parent)
            laptop.setBrand(details.getBrand());
            laptop.setPrice(details.getPrice());

            // Update fields from LaptopEntity (Child)
            laptop.setRamSize(details.getRamSize());

            return ResponseEntity.ok(laptopRepository.save(laptop));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (laptopRepository.existsById(id)) {
            laptopRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}