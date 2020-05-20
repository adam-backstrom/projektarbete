package com.quik.projektarbete.dao;

import com.quik.projektarbete.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

// CrossOrigin öppnar upp för andra maskiner att läsa det exponerade datat.

// JpaRepository<Product, Long> exponerar all Product-data från ändelsen /products,
// och en specifik product med id kan hämtas genom /products/"id".

// Query-metoden finByNameContaining exponeras från API-endpointen /search/findByNameContaining,
// och parametern "name" läggs till med ?name= vilket gör att om man söker på "carrots" blir
// den hela API-endpointen /search/findByNameContaining?name=carrots.

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContaining(@RequestParam("name") String name);
}
