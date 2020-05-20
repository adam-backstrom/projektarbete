import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';
import { Receipt } from '../common/receipt';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  receipt: Receipt;

  receiptSubject: Subject<Receipt> = new Subject<Receipt>();

  constructor() { }

  // Lägger till en kundvagns-produkt i kundvagns-arrayen.
  // Om produkten redan finns i kundvagns-arrayen så ökas antalet med 1.

  addToCart(theCartItem: CartItem) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
  }

  // Tar bort en kundvagns-produkt från kundvagns-arrayen.
  // Om antalet blir 0, så tas kundvagns-produkten bort från kundvagns-arrayen.

  subtractFromCart(theCartItem: CartItem) {
    
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  // Inkommande kundvagns-produkt matchas mot befintliga
  // kundvagns-produkter i kundvagns-arrayen, om det förekommer
  // ett överensstämmande id så sparas index på den plats där
  // överensstämmningen hittades och elementet tas bort på den platsen
  // i kundvagns-arrayen .

  remove(theCartItem: CartItem) {
    
    const itemIndex = this.cartItems.findIndex(tempCartItem =>  tempCartItem.id === theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }

  // Räknar ut det sammanlagda antalet kundvagns-produkter som finns i
  // kundvagns-arrayen och det totala priset på alla kundvagns-produkter i
  // kundvagns-arrayen.
  // Dessa nummer skickas sedan ut till alla de prenumertions-metoder som är
  // kopplade till Subject-klasserna totalPrice och totalQuantity.

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let tempCartItem of this.cartItems) {
      totalPriceValue += tempCartItem.quantity * tempCartItem.unitPrice;
      totalQuantityValue += tempCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

}
