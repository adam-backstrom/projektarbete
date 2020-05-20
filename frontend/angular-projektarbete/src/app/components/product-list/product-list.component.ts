import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  searchMode: boolean;

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  // Bestämmer om alla produkter eller bara de som matchar med ett sökord ska hämtas från backenden

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  // Körs om det är en sökning av produkt med ett sökord, 
  // hämtar då alla produkter som matchar med sökordet från backenden med hjälp en metod i productService
  // och sätter denna information i en produkt-array.

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    console.log("keyword: " + theKeyword);

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  // Körs om det inte är en sökning,
  // hämtar då alla produkter från backenden med hjälp av en metod i productService
  // och sätter denna information i en produkt-array

  handleListProducts() {

    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    );
  }

  // Skapar upp ett nytt kundvagns-produkt-objekt från det produkt-objektet som klickas på och lägger till detta i
  // kundvags-arrayen.


  addToCart(theProduct: Product) {

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }
}
