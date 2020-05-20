import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

// Hämtar en produkt baserat på produkt-id från API-enpointen /products/id

  getProduct(theProductId: number): Observable<Product> {
    
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  // Hämtar alla produkter från API-enpointen /products

  getProductList(): Observable<Product[]> {
    
    return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
      map(response => response._embedded.products));
  }

  // Hämtar produkter från API-enpoint baserat på ett sökord från API-endpointen /search/findByNameContaining?name=

  searchProducts(theKeyword: string): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products));
  }
}

// Interface för att packa upp JSON som skickas från Spring Data Rest och placera
// den datan i en array av produkter.

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}
