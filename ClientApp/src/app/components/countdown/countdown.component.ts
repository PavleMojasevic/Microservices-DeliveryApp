import { AfterViewInit, Component, OnInit } from '@angular/core'; 
import { delay, interval, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model'; 


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent{ 
  minuti:number=0;
  sekunde:number=0;
  order:Order|undefined;
  interval:any; 
  finished: boolean=true;
  constructor(private orderService:OrderService,private router: Router)
  {
    let vreme;
    this.orderService.GetCurrentOrder().subscribe(
      (data : Order|null) => {
        if(data!=null)
        {
          this.finished=false;
          this.order=data;  
              let sum=0;
              for(let i=0;i< this.order.orderParts.length;i++)
              {
                  sum=sum+ this.order.orderParts[i].product.price* this.order.orderParts[i].quantity;
              }
              this.order.Value=sum+250; 
              console.log(this.order);
            let now:Date=new Date();
            vreme = Date.now() - +(new Date(data.dateTimeOfDelivery));
            vreme=-vreme/1000;
            this.minuti=Math.floor(vreme/60);
            this.sekunde=Math.floor(vreme-this.minuti*60);
            this.interval=setInterval(()=>{
              if(this.sekunde>0)
              {
                this.sekunde=this.sekunde-1;
              }
              else
              {
                if(this.minuti==0)
                {
                  this.StopTimer();
                }
                this.sekunde=59;
                this.minuti=this.minuti-1;
              }
            },1000);
          } 
      });
  }
  StopTimer() { 
    clearInterval(this.interval);
    this.finished=true;
  }
}
