package csd230.controllers;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(Long id) {
        super("Could not find book with ID: " + id);
    }
}

