import { Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {AddProductComponent} from './add-product/add-product.component';
import {OrdersComponent} from './orders/orders.component';
import {AddOrderComponent} from './add-order/add-order.component';
import {CategoriesComponent} from './categories/categories.component';
import {AddCategoryComponent} from './add-category/add-category.component';
import {CustomersComponent} from './customers/customers.component';
import {AddCustomerComponent} from './add-customer/add-customer.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {EditCategoryComponent} from './edit-category/edit-category.component';


export const routes: Routes = [
  {path : "products", component : ProductsComponent},
    {path : "add-product", component : AddProductComponent},
    {path : "edit-product/:id", component : EditProductComponent},
  {path : "orders", component : OrdersComponent},
  {path : "add-order", component : AddOrderComponent},
  {path : "categories", component : CategoriesComponent},
  {path : "add-category", component : AddCategoryComponent},
  {path : "edit-category/:id", component : EditCategoryComponent},

  {path : "customer", component : CustomersComponent},
  {path : "add-customer", component : AddCustomerComponent},


  {path : "", redirectTo : "/products", pathMatch : "full"},
  //category
  //product
  //add-product
  //edit-product


];
