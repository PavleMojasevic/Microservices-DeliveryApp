import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';    
import { Token } from 'src/app/models/token.model';
import { UserService } from 'src/app/services/user.service'; 
import { Login } from 'src/app/models/login.model';
import { GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { SocialAuthService } from "angularx-social-login"; 
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
  
  loginForm:FormGroup; 
  guser:object=new Object();
  constructor(private userService:UserService,private router: Router,private socialAuthService: SocialAuthService ) { 
 

    this.loginForm=new FormGroup({
      'username':new FormControl('',Validators.required),
      'password':new FormControl('',[Validators.required, Validators.minLength(4)])
    });

    

  }
  ngOnInit(): void {
    this.loginForm=new FormGroup({
      'username':new FormControl('',Validators.required),
      'password':new FormControl('',[Validators.required, Validators.minLength(4)])
    });
  } 
  user:User=new User();
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {this.socialAuthService.authState.subscribe((user:SocialUser) => {
        this.user.firstname=user.firstName; 
        this.user.lastname=user.lastName; 
        this.user.email=user.email; 
        this.user.photoUrl=user.photoUrl; 
        this.user.username=user.name; 
        this.user.birthDate=new Date().toISOString();
        console.log(this.user);
        console.log(user);
        this.userService.loginGoogle(this.user).subscribe(
          (data : Token) => { 
            if(data==null)
            {
    
              alert('Greska u google autentifikaciji');
            }
            else
            {
            localStorage.setItem('token', data.token);
            this.router.navigateByUrl('/');
            }
          },
          error => {
            alert('Greska na serveru');
          }
        );
      });
      });
  }

  login():void
  { 
    let login=new Login();
    login.username=this.loginForm.value['username'];
    login.password=this.loginForm.value['password'];
    this.userService.login(login).subscribe(
      (data : Token) => { 
        if(data==null)
        {

          alert('Pograresno korisnicko ime ili lozinka');
        }
        else
        {
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/');
        }
      },
      error => {
        alert('Greska na serveru');
      }
    );
  } 
}
