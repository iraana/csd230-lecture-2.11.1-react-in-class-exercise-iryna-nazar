package csd230.controllers;

import csd230.entities.CartEntity;
import csd230.entities.ProductEntity;
import csd230.repositories.CartEntityRepository;
import csd230.repositories.ProductEntityRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional; // Import this

@RestController
@RequestMapping("/api/rest/cart")
@CrossOrigin(origins = "*")
public class CartRestController {
    private final CartEntityRepository cartRepository;
    private final ProductEntityRepository productRepository;

    public CartRestController(CartEntityRepository cartRepository, ProductEntityRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    private CartEntity getDefaultCart() {
        // Look for the first cart, or create one if none exist
        return cartRepository.findAll().stream().findFirst().orElseGet(() -> {
            CartEntity newCart = new CartEntity();
            // REMOVED: newCart.setId(1L) - Let the database generate the ID
            return cartRepository.save(newCart);
        });
    }

    @GetMapping
    public CartEntity getCart() {
        return getDefaultCart();
    }

    @PostMapping("/add/{productId}")
    @Transactional // Ensure the join table update is committed
    public CartEntity addToCart(@PathVariable Long productId) {
        CartEntity cart = getDefaultCart();
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cart.addProduct(product);
        return cartRepository.save(cart);
    }

    @DeleteMapping("/remove/{productId}")
    @Transactional
    public CartEntity removeFromCart(@PathVariable Long productId) {
        CartEntity cart = getDefaultCart();
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cart.getProducts().remove(product);
        return cartRepository.save(cart);
    }
}