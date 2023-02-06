import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import {JwtHelperService} from '@auth0/angular-jwt';
import { TokenData } from 'src/app/models/token.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  user:TokenData|null;
  type:string|undefined;
  isActivated:string="";
  constructor(private router: Router, private helper:JwtHelperService) {   
    this.type="";     
    let token = localStorage.getItem("token");  
    if(token!=null&& !this.helper.isTokenExpired(token))
    {
         this.user=helper.decodeToken(token);
         this.type=this.user?.role;
         this.isActivated=helper.decodeToken(token).isActivated;
     }
    else
      this.user=null;
  }

  ngOnInit(): void {
  }
  logout():void{
    localStorage.removeItem("token");
    this.user=null;
    this.router.navigate(['/login']);
  }
}
