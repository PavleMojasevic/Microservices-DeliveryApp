import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model'; 
import { OrderService } from 'src/app/services/order.service'; 
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service'; 
import { TokenData } from 'src/app/models/token.model';
import { Product } from 'src/app/models/product.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  products:Array<Product>=new Array<Product>();
  orderForm:FormGroup=new FormGroup({});
  deliveryForm:FormGroup;
  order:Order=new Order(0);
  constructor(private productService:ProductService, private userService:UserService, private orderService:OrderService,private router: Router, private helper:JwtHelperService) 
  { 
    this.deliveryForm=new FormGroup(
    {
      'address':new FormControl('', [Validators.required, Validators.minLength(4)]),
      'comment':new FormControl('')
    });
    this.productService.GetAll().subscribe(
    (data : Array<Product>) => {
        this.products=data;
    
        let controls:any={};
        this.products.forEach(element => { 
           controls["quantity-"+element.name]= new FormControl('0', [Validators.min(0), Validators.required]);
        });
        this.orderForm=new FormGroup( controls);
    });
  }

  ngOnInit(): void {
  }
  finishOrder():void
  {
    if(this.orderForm.valid && localStorage.getItem("token")!=null)
    {
      let tokens = localStorage.getItem("token"); 
      if(tokens==null)
        return;
      let token=this.helper.decodeToken(tokens);
      this.order=new Order(parseInt( (token as TokenData).id));
   
        this.products.forEach(element => {
          if(this.orderForm.value["quantity-"+element.name]!="0")
          {
            if(this.orderForm.value["quantity-"+element.name]>0){
              this.order.Add(element, this.orderForm.value["quantity-"+element.name]);
            }
          }
            
        });
        if (this.order.orderParts.length==0)
        {
          this.order=new Order(0);
        }   
    }
  }
  placeOrder():void
  {
    if(this.deliveryForm.valid)
    { 
      let tokens = localStorage.getItem("token"); 
      if(tokens==null)
        return;
      let token=this.helper.decodeToken(tokens);
      this.order.address=this.deliveryForm.value['address'];
      this.order.comment=this.deliveryForm.value['comment'];
      this.orderService.Add(this.order).subscribe(
      (data : boolean) => { 
        if(data==true)
        {
          this.router.navigateByUrl('');
        }
        else 
        { 
          alert("Doslo je do greske");
        }
      });
    }
    else{
      alert("Greska u unosu");
    }

  }
}
