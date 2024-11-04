import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Router } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = { idProduct: 0, nameProduct: '', priceProduct: 0, dateCreate: new Date(), category: undefined };
  categories: Category[] = [];
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Categories:', this.categories);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error fetching categories: ${error}`;

        console.error('Error fetching categories:', error);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newProduct: Product = {
        ...this.product,
        idProduct: Math.floor(Math.random() * 1000),  // Temporary ID generation for example
        nameProduct: form.value.name,
        priceProduct: form.value.price,
        dateCreate: form.value.date,
        category: form.value.category
      };

      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          console.log('Product added:', newProduct);
          this.router.navigate(['/products']);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = `Error adding product: ${error.message}`;
          console.error('Error adding product:', error);
        }
      });

      form.reset();
    }
  }
}
