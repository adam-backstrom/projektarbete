import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.listCartDetails();
  }

  // Hämtar in kundvagns-arrayen från cartService, sätter upp prenumerationer mot Subject-klasser för totalt antal och pris
  // för kundvagnen och skickar ut pingar efter informationen.

  listCartDetails() {

    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  // Kör metod i cartService för att lägga till eller öka antal av en produkt i kundvagns-arrayen
  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  // Kör metod i cartService för att ta bort eller minska antal av en produkt i kundvagns-arrayen
  decrementQuantity(theCartItem: CartItem) {
    this.cartService.subtractFromCart(theCartItem);
  }

  // Kör metod i cartService för att ta bort en produkt i kundvagns-arrayen
  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}
