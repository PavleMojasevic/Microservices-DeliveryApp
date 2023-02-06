import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  isActivated:string="";
  status:string="";
  ngOnInit(): void {
  }
  constructor(private router: Router, private helper:JwtHelperService){
    let token = localStorage.getItem("token");  
    if(token!=null&& !this.helper.isTokenExpired(token))
    {
         let user=helper.decodeToken(token);
         this.isActivated=user.isActivated;
         this.status=user.Status;
     }
  }
}
