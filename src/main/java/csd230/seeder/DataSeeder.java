package csd230.seeder;

import csd230.entities.*;
import csd230.repositories.*;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final LaptopRepository laptopRepository;
    private final Faker faker = new Faker();

    public DataSeeder(BookRepository br, MagazineRepository mr, LaptopRepository lr) {
        this.bookRepository = br;
        this.magazineRepository = mr;
        this.laptopRepository = lr;
    }

    @Override
    public void run(String... args) {
        if (bookRepository.count() == 0 && magazineRepository.count() == 0 && laptopRepository.count() == 0) {
            seedBooks(10);
            seedMagazines(7);
            seedLaptops(5);
        }
    }

    private void seedBooks(int count) {
        for (int i = 0; i < count; i++) {
            BookEntity book = new BookEntity(
                    faker.book().title(),
                    faker.number().randomDouble(2, 15, 60), // Price (Double)
                    faker.number().numberBetween(1, 20),    // Copies (Integer)
                    faker.book().author()
            );
            bookRepository.save(book);
        }
        System.out.println(" - Created " + count + " Books");
    }

    private void seedMagazines(int count) {
        for (int i = 0; i < count; i++) {
            LocalDateTime issueDate = faker.date().past(60, TimeUnit.DAYS)
                    .toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            MagazineEntity mag = new MagazineEntity(
                    faker.book().publisher() + " Monthly",
                    faker.number().randomDouble(2, 5, 12),
                    15, // copies
                    100, // orderQty
                    issueDate
            );
            magazineRepository.save(mag);
        }
        System.out.println(" - Created " + count + " Magazines");
    }

    private void seedLaptops(int count) {
        String[] brands = {"Apple", "Dell", "HP", "Lenovo", "Asus"};
        for (int i = 0; i < count; i++) {
            LaptopEntity laptop = new LaptopEntity(
                    brands[faker.number().numberBetween(0, 4)],
                    faker.number().randomDouble(2, 800, 2500),
                    faker.options().option(8, 16, 32, 64) // Random RAM sizes
            );
            laptopRepository.save(laptop);
        }
        System.out.println(" - Created " + count + " Laptops");
    }
}