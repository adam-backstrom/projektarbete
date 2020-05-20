export class Receipt {
    customer: Customer = new Customer();
    shippingAddress: ShippingAddress = new ShippingAddress();
    cardInfo: CardInfo = new CardInfo();
}

class Customer {
    firstName: string = "";
    lastName: string = "";
    email: string = "";
}

class ShippingAddress {
    country: string = "";
    city: string = "";
    street: string = "";
    zipCode: string = "";
}

class CardInfo {
    cardType: string = "";
    nameOnCard: string = "";
    cardNumber: string = "";
    securityCode: string = "";
    expirationMonth: string = "";
    expirationYear:  string = "";
}
