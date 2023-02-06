import { DatePipe } from "@angular/common";
import { DateTimeProvider } from "angular-oauth2-oidc";
import { Product } from "./product.model";
import { User } from "./user.model";
export class OrderElement
{
    product:Product;
    quantity:number;
    constructor(product:Product, quantity:number=1)
    {
        this.product=product;
        this.quantity=quantity;
    }
}
export class Order{
    user:User=new User();
    dostavljac:User=new User();
    userId:number=0;
    deliveredBy:number=0;
    orderId:number=0;
    Value:number=0;
    address:string="";
    comment:string="";
    state:string="";
    dateTimeOfDelivery:Date=new Date();
    orderParts:Array<OrderElement>;
    constructor(user:number)
    {
        this.orderParts=new Array();
        this.userId=user;
    }
    Add(product:Product, quantity:number):void 
    {
        for(let i=0;i<this.orderParts.length;i++)
        {
            if(this.orderParts[i].product.name==product.name)
            {
                this.orderParts[i].quantity=quantity;
                return;
            }
        }
        let oe = new OrderElement(product, quantity);
        this.orderParts.push(oe);
    }
    GetValue():number
    {
        let sum=0;
        for(let i=0;i<this.orderParts.length;i++)
        {
            sum=sum+this.orderParts[i].product.price*this.orderParts[i].quantity;
        }
        return sum;
    }
    
}