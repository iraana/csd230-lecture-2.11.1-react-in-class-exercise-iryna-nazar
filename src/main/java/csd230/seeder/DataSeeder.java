package csd230.seeder;

import com.github.javafaker.Faker;
import csd230.entities.*;
import csd230.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder; // NEW
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final LaptopRepository laptopRepository;
    private final UserEntityRepository userRepository; // NEW
    private final DiscMagRepository discMagRepository;
    private final PhoneRepository phoneRepository;
    private final TicketRepository ticketRepository;
    private final PasswordEncoder passwordEncoder; // NEW
    private final Faker faker = new Faker();

    // Updated constructor to include User items
    public DataSeeder(BookRepository br, MagazineRepository mr, LaptopRepository lr,
                      PhoneRepository pr, TicketRepository tr, DiscMagRepository dmr,
                      UserEntityRepository ur, PasswordEncoder pe) {
        this.bookRepository = br;
        this.magazineRepository = mr;
        this.laptopRepository = lr;
        this.phoneRepository = pr;
        this.ticketRepository = tr;
        this.discMagRepository = dmr;
        this.userRepository = ur;
        this.passwordEncoder = pe;
    }

    @Override
    public void run(String... args) {

        if (bookRepository.count() == 0) {
            seedBooks(10);
        }

        if (magazineRepository.count() == 0) {
            seedMagazines(7);
        }

        if (laptopRepository.count() == 0) {
            seedLaptops(5);
        }

        if (phoneRepository.count() == 0) {
            phoneRepository.save(new PhoneEntity("iPhone 15", 999.99, 128));
            phoneRepository.save(new PhoneEntity("Samsung S24", 899.99, 256));
        }
        if (ticketRepository.count() == 0) {
            ticketRepository.save(new TicketEntity("Tech Conference 2026", 150.00));
            ticketRepository.save(new TicketEntity("Local Book Fair", 10.00));
        }

        if (userRepository.count() == 0) {
            System.out.println("🌱 Seeding Users...");

            UserEntity admin = new UserEntity("admin", passwordEncoder.encode("admin"), "ADMIN");
            userRepository.save(admin);

            UserEntity user = new UserEntity("user", passwordEncoder.encode("user"), "USER");
            userRepository.save(user);

            System.out.println("✅ Default users created");
        }
    }

    private void seedBooks(int count) {
        for (int i = 0; i < count; i++) {
            BookEntity book = new BookEntity(faker.book().title(), faker.number().randomDouble(2, 15, 60), 10, faker.book().author());
            bookRepository.save(book);
        }
        System.out.println(" - Created " + count + " Books");
    }

    private void seedMagazines(int count) {
        for (int i = 0; i < count; i++) {
            LocalDateTime issueDate = faker.date().past(60, TimeUnit.DAYS).toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            MagazineEntity mag = new MagazineEntity(faker.book().publisher() + " Weekly", faker.number().randomDouble(2, 5, 12), 15, 100, issueDate);
            magazineRepository.save(mag);
        }
        System.out.println(" - Created " + count + " Magazines");
    }

    private void seedLaptops(int count) {
        String[] brands = {"Apple", "Dell", "HP", "Lenovo", "Asus"};
        for (int i = 0; i < count; i++) {
            LaptopEntity laptop = new LaptopEntity(brands[faker.number().numberBetween(0, 4)], faker.number().randomDouble(2, 800, 2500), faker.options().option(8, 16, 32));
            laptopRepository.save(laptop);
        }
        System.out.println(" - Created " + count + " Laptops");
    }
}