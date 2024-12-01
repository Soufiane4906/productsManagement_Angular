import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { OrdersComponent } from './orders/orders.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { LoginComponent } from './login/login.component';
import { productGuard } from './product.guard';
import {ForbiddenComponent} from './forbidden/forbidden.component';

export const routes: Routes = [
  {path: 'forbidden', component: ForbiddenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent  },
  { path: 'add-product', component: AddProductComponent, canActivate: [productGuard], data: { roles: ['ADMIN' , 'CREATE'] } },

  { path: 'orders', component: OrdersComponent, canActivate: [productGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'add-order', component: AddOrderComponent, canActivate: [productGuard], data: { roles: ['ADMIN', 'CREATE'] } },
  { path: 'categories', component: CategoriesComponent, canActivate: [productGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'add-category', component: AddCategoryComponent, canActivate: [productGuard], data: { roles: ['ADMIN', 'CREATE'] } },
  { path: 'edit-category/:id', component: EditCategoryComponent, canActivate: [productGuard], data: { roles: ['ADMIN', 'UPDATE'] } },
  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [productGuard], data: { roles: ['ADMIN', 'UPDATE'] } },
  { path: 'customer', component: CustomersComponent, canActivate: [productGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: 'add-customer', component: AddCustomerComponent, canActivate: [productGuard], data: { roles: ['ADMIN', 'CREATE'] } },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
