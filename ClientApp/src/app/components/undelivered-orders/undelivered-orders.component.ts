import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-undelivered-orders',
  templateUrl: './undelivered-orders.component.html',
  styleUrls: ['./undelivered-orders.component.css']
})
export class UndeliveredOrdersComponent implements OnInit {

  orders: Array<Order>=new Array<Order>();
  constructor(private router: Router,private orderService:OrderService) {
    this.orderService.GetUndelivered().subscribe(
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
  Preuzmi(id:number):void{
     this.orderService.TakeOrder(id).subscribe(
       (data)=>
       {
         if(data)
         {
           alert("Uspesno preuzeto");
           this.router.navigateByUrl('');
         }
         else
         {
           alert("Ne mogu se preuzeti vise porudzbina istovremeno");
         }
       }
     )
  }

}
