import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { CategoryService } from './category.service';
import { apiUrl } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = apiUrl;
  products: Product[] = [];

  constructor(private http: HttpClient, private categoryService: CategoryService) {
    this.loadProducts();
  }

  private loadProducts() {
    this.getProducts().subscribe(products => {
      this.products = products;
      this.sortProductById();
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl, product);

  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  //sort product by id
  sortProductById(): void {
    this.products.sort((a, b) => a.idProduct! - b.idProduct!);
  }
}
