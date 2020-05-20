import { Product } from './product';

export class CartItem {

    id: string;
    name: string;
    imgUrl: string;
    unitPrice: number;
    unitWeight: number;
    quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imgUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;
        this.unitWeight = product.unitWeight;
        this.quantity = 1;
    }
}
