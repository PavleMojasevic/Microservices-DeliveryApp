import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component'; 
import { LoginGuard } from './guards/login.guard';
import { UserGuard } from './guards/user.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewOrderComponent } from './components/new-order/new-order.component'; 
import { CountdownComponent } from './components/countdown/countdown.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { UndeliveredOrdersComponent } from './components/undelivered-orders/undelivered-orders.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { VerificationComponent } from './components/verification/verification.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderHistoryDelivererComponent } from './components/order-history-deliverer/order-history-deliverer.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AdminGuard } from './guards/admin.guard';
import { DelivererGuard } from './guards/deliverer.guard'; 

const routes: Routes = [
  { path:"login",component:  LoginComponent, canActivate:[LoginGuard]},
  { path:"registration",component:  RegistrationComponent, canActivate:[LoginGuard]},
  { path:"profile",component:  ProfileComponent, canActivate:[LoggedInGuard]},
  { path:"neworder",component:  NewOrderComponent, canActivate:[UserGuard]},
  { path:"countdown",component:  CountdownComponent, canActivate:[LoggedInGuard]},
  { path:"allorders",component:  AllOrdersComponent, canActivate:[AdminGuard]},
  { path:"undelivered",component:  UndeliveredOrdersComponent, canActivate:[DelivererGuard]},
  { path:"addproduct",component:  AddProductComponent, canActivate:[AdminGuard]},
  { path:"verification",component:  VerificationComponent, canActivate:[AdminGuard]},
  { path:"orderHistory",component:  OrderHistoryComponent, canActivate:[UserGuard]},
  { path:"orderHistoryDeliverer",component:  OrderHistoryDelivererComponent, canActivate:[DelivererGuard]},
  { path:"", component:  HomeComponent} 


]; 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 