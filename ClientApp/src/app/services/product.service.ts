import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService { 

  GetAll() :Observable<Array<Product>> { 
    return this.http.get<Array<Product>>(environment.productServiceUrl + '/api/products'); 
   }
   Add(product:Product) :Observable<boolean> { 
     return this.http.post<boolean>(environment.productServiceUrl + '/api/products',product); 
    }
   constructor(private http:HttpClient) {}
}
