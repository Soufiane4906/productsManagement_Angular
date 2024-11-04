import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  category: Category = new Category();
  newCategory : Category= new Category();


  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = +params['id'];
      const fetchedCategory = this.categoryService.getCategoryById(categoryId).subscribe(category => {
        if (category) {

          this.category = category;
        }
      });

    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
       this.categoryService.updateCategory(this.category).subscribe(
        category => {

          console.log('Category updated:', category);
        }
       );

      this.router.navigate(['/categories']);
    }
  }
}
