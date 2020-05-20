import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Receipt } from 'src/app/common/receipt';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    
    // Skapar upp formulär-grupper som innehåller fält, dessa fält fylls på av användaren från HTML sidan och sparas när
    // det simulerade köpet genomförs.

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        city: [''],
        street: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.checkoutDetails();
  }

  // Sätter upp prenumerationer mot Subject-klasser i cartService och skickar ut ny information.

  checkoutDetails() {

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  // Körs när formuläret skickas in, sätter då in formulär-gruppernas fält i egenskaperna i Receipt-klassen.
  // Navigerar sedan till Kvitto-komponenten.

  onSubmit() {

    this.cartService.receipt = Object.assign({}, this.checkoutFormGroup.value);

    this.router.navigateByUrl('/receipt-details');

  }
}
