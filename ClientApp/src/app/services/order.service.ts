import { Injectable } from '@angular/core';
import { Order, OrderElement } from '../models/order.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) {}
  Add(order: Order):Observable<boolean> {
    return this.http.post<boolean>(environment.productServiceUrl + '/api/Order',order);

  } 
  GetAll():Observable<Array<Order>> {
    return this.http.get<Array<Order>>(environment.productServiceUrl + '/api/Order');

  } 
  GetUndelivered():Observable<Array<Order>> {
    return this.http.get<Array<Order>>(environment.productServiceUrl + '/api/Order/Undelivered');

  } 
  TakeOrder(id:number):Observable<boolean> {
    return this.http.post<boolean>(environment.productServiceUrl + '/api/Order/TakeOrder', id);

  } 
  OrderHistory():Observable<Array<Order>> {
    return this.http.get<Array<Order>>(environment.productServiceUrl + '/api/Order/history');

  } 
  OrderHistoryDeliverer():Observable<Array<Order>> {
    return this.http.get<Array<Order>>(environment.productServiceUrl + '/api/Order/historyDeliverer');

  } 
  GetCurrentOrder():Observable<Order> {
    return this.http.get<Order>(environment.productServiceUrl + '/api/Order/currentOrder');

  } 
 
}
