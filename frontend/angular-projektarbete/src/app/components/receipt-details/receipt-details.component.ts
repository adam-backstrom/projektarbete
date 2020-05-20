import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Receipt } from 'src/app/common/receipt';
import { CartItem } from 'src/app/common/cart-item';
import { Router } from '@angular/router';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrls: ['./receipt-details.component.css']
})
export class ReceiptDetailsComponent implements OnInit {

  constructor(private cartService: CartService) { }

  receipt: Receipt;

  totalPrice: number = 0;

  cartItems: CartItem[];

  ngOnInit(): void {

    this.receiptDetails();
    this.clearOutCart();
  }

  // Hämtar kvitto och kundvagns-array från cartService och räknar ut det totala priset på kundvagnen.

  receiptDetails() {

    this.receipt = this.cartService.receipt;
    this.cartItems = this.cartService.cartItems;
    
    for (let tempCartItem of this.cartItems) {
      this.totalPrice += tempCartItem.unitPrice * tempCartItem.quantity;
    }
  }

  // Sätter kundvagns-arrayen i cartService till en tom array och räknar ut de nya värdena, vilka nu är 0.

  clearOutCart() {

    this.cartService.cartItems = [];
    this.cartService.computeCartTotals();
  }
}
