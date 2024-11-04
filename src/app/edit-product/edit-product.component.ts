import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { DatePipe, formatDate, NgForOf } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  newProduct: Product = { nameProduct: '', priceProduct: 0, dateCreate: new Date() , category : {idCategory: 0, category: ''}};
  categories?: Category[] = [];
  oldCategoryId?: number;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const productId = +params['id'];
      console.log('Product ID:', productId);

      this.productService.getProductById(productId).subscribe(product => {
        if (product) {
          this.newProduct = product;
          this.oldCategoryId = this.newProduct.category?.idCategory;


          // Log for debugging
          console.log('Product fetched:', this.newProduct);
        }
      });
    });

    // Fetch categories
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;

      // Check if there's an old category ID to select
      if (this.oldCategoryId != null) {
        // Find the category object that matches the old category ID
        this.newProduct.category = this.categories.find(category => category.idCategory === this.oldCategoryId);
      }
    });

    // Fetch product by ID
  }

  onSubmit(productForm: NgForm): void {
    if (productForm.valid) {
      const updatedProduct: Product = {
        ...this.newProduct,
        nameProduct: productForm.value.name,
        priceProduct: productForm.value.price,
        dateCreate: productForm.value.date,
        category: productForm.value.category
      };

      this.productService.updateProduct(updatedProduct).subscribe(
        product => {
          console.log('Product updated:', product);
        }
      );

      this.router.navigate(['/products']);
    }
  }

  protected readonly formatDate = formatDate;
}
