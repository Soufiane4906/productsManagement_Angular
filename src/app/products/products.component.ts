import { Component } from '@angular/core';
import { DatePipe, NgForOf } from '@angular/common';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    RouterLink,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  page: number = 1;

  constructor(private productService: ProductService, private router: Router) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.sortById();
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.idProduct!).subscribe(() => {
      this.loadProducts();

    });
  }

  show(product: Product) {
    alert(`Product: ${product.nameProduct}, Price: ${product.priceProduct}, Date: ${product.dateCreate ? product.dateCreate : 'N/A'}`);
    this.router.navigate(['/products']);
  }

  searchProducts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      (product.idProduct?.toString().includes(query) ||
        product.nameProduct?.toLowerCase().includes(query) ||
        product.priceProduct?.toString().includes(query) ||
        product.dateCreate?.toString().includes(query)) ||
      (product.category?.category?.toLowerCase().includes(query))

    );
  }

  sortById(): void {
    this.filteredProducts.sort((a, b) => a.idProduct! - b.idProduct!);
  }
}
