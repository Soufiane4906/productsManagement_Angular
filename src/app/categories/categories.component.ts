import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-categories',
  imports: [


    NgForOf,
    RouterLink,
    FormsModule,
    NgxPaginationModule
  ],
  templateUrl: './categories.component.html',
  standalone: true,
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchQuery: string = '';
  page: number = 1;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    // Fetch categories on component initialization
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.filteredCategories = categories;
    });
  }

  deleteCategory(id: any): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(category => category.idCategory !== id);
      this.filteredCategories = this.categories;
    });
  }

  show(category: Category): void {
    alert(`Category: ${category.category}`);
    this.router.navigate(['/categories']);
  }

  searchCategories(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredCategories = this.categories.filter(category =>
      category.idCategory?.toString().includes(query) ||
      category.category?.toLowerCase().includes(query)
    );
  }
}
// Compare this snippet from src/app/edit-product/edit-product.component.html:
