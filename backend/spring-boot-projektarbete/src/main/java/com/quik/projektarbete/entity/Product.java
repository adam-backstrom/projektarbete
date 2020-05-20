package com.quik.projektarbete.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

// Lomboks annotation @Data används för att skapa upp entiteten, denna sätter getters och setters för egenskaperna.
// Tabellen och egenskaperna mappas mot databasen med @Table och @Column där "name" är namnet på fälten i databasen.

@Entity
@Table(name="product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "unit_weight")
    private BigDecimal unitWeight;

    @Column(name = "image_url")
    private String imageUrl;
}
