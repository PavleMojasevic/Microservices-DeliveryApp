import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: Array<Order>=new Array<Order>();
  constructor(private orderService:OrderService, private userService:UserService) {
    this.orderService.OrderHistory().subscribe(
      (data : Array<Order>) => {
        this.orders=data;
        this.orders.forEach(item=>{ 
          let sum=0;
          for(let i=0;i<item.orderParts.length;i++)
          {
              sum=sum+item.orderParts[i].product.price*item.orderParts[i].quantity;
          }
          item.Value=sum+250;
        })
      });
  }

  ngOnInit(): void {
  }
}
