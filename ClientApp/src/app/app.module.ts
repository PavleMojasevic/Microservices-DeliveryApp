import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { AddProductComponent } from './components/add-product/add-product.component'; 
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service'; 
import { ToastrModule } from 'ngx-toastr';
import { MyOrdersComponent } from './components/my-orders/my-orders.component'; 
import { CountdownModule } from 'ngx-countdown';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { UndeliveredOrdersComponent } from './components/undelivered-orders/undelivered-orders.component';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { OneOrderComponent } from './components/one-order/one-order.component';
import { VerificationComponent } from './components/verification/verification.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderHistoryDelivererComponent } from './components/order-history-deliverer/order-history-deliverer.component';
 
import { SocialLoginModule,SocialAuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";   
export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    ProfileComponent,
    NewOrderComponent,
    CountdownComponent,
    AddProductComponent,
    MyOrdersComponent,
    AllOrdersComponent,
    UndeliveredOrdersComponent,
    OneOrderComponent,
    VerificationComponent,
    OrderHistoryComponent,
    OrderHistoryDelivererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    CountdownModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains:environment.allowedDomains
      }
      }),
      SocialLoginModule
  ],
  providers: [
    OrderService,
    UserService, 
    ProductService,{
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('148517665605-jspahbqleats6lvlag9kasc2c11b5g7o.apps.googleusercontent.com')

          }
        ]
      }
    }
    ],
   
  bootstrap: [AppComponent]
})
export class AppModule { }
