import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  // Hämtar en produkt med specifikt id från backenden med hjälp av  en metod i productService
  //och sätter denna information i ett produkt-objekt.

  handleProductDetails() {
    
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  // Skapar upp ett nytt kundvagns-produkt-objekt från det hämtade produkt-objektet och lägger till detta i
  // kundvags-arrayen.

  addToCart() {

    const theCartItem = new CartItem(this.product);

    this.cartService.addToCart(theCartItem);

  }
}
