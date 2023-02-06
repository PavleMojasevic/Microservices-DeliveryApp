import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addForm:FormGroup; 
  constructor(private productService:ProductService,private router: Router) { 
    this.addForm=new FormGroup({
      'name':new FormControl('',[Validators.required, Validators.minLength(2)]),
      'ingredients':new FormControl('',[Validators.required, Validators.minLength(2)]),
      'price':new FormControl('',[Validators.required, Validators.min(0)])
    });        
  }
  ngOnInit(): void {
    this.addForm=new FormGroup({
      'name':new FormControl('',[Validators.required, Validators.minLength(2)]),
      'ingredients':new FormControl('',[Validators.required, Validators.minLength(2)]),
      'price':new FormControl('',[Validators.required, Validators.min(0)])
    });
  }
  add():void
  {
     if(this.addForm.valid)
     {
        let product:Product=new Product();
        product.name=this.addForm.value['name'];
        product.ingredients=this.addForm.value['ingredients'];
        product.price=this.addForm.value['price'];
        this.productService.Add(product).subscribe(
          (data:boolean)=>{
            if(data)
            {
              alert("Uspesno dodato");
            }
            else  
            {
              alert("Greska");
            }
          }
        );
     }
     else
     {
       alert("Greska u unosu forme");
     }
  }

}
