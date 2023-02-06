import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-one-order',
  templateUrl: './one-order.component.html',
  styleUrls: ['./one-order.component.css']
})
export class OneOrderComponent implements OnInit {
  @Input() order:Order | undefined;
  constructor(private userService:UserService) {
    
    if(this.order!=null)
    {
      this.order.user=new User();
      this.userService.GetUserById(this.order.userId).subscribe(
      (data:User)=>
      {
        if(this.order!=null)
          this.order.user=data;
      });
      if(this.order.deliveredBy!=0)
      {
        
      this.userService.GetUserById(this.order.deliveredBy).subscribe(
        (data:User)=>
        {
          if(this.order!=null)
            this.order.dostavljac=data;
        });
      }
    }

  }

  ngOnInit(): void {
    if(this.order!=null)
    {
      this.order.user=new User();
      this.userService.GetUserById(this.order.userId).subscribe(
      (data:User)=>
      {
        if(this.order!=null)
          this.order.user=data;
      });
      if(this.order.deliveredBy!=0)
      {
        
      this.userService.GetUserById(this.order.deliveredBy).subscribe(
        (data:User)=>
        {
          if(this.order!=null)
            this.order.dostavljac=data;
        });
      }
    }
  }

}
