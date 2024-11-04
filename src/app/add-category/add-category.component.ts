import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newCategory: Category = {
        idCategory: Math.floor(Math.random() * 1000),
        category: this.category.category,
      };
      this.categoryService.addCategory(newCategory);
      this.router.navigate(['/categories']);
    }
    form.reset();
  }
}
