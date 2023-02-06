import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from 'src/app/services/user.service';
import jwt_decode from "jwt-decode";
import { Token } from '@angular/compiler';
import { TokenData } from 'src/app/models/token.model';
import { User } from 'src/app/models/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup;
  imageForm:FormGroup;
  user:User=new User();
  isGoogle:string="";
  constructor(private userService:UserService,private router: Router, private helper:JwtHelperService,private sanitizer: DomSanitizer) {  
      
    this.profileForm= new FormGroup({
      'username':new FormControl('',[Validators.required, Validators.minLength(4)]),
      'password':new FormControl('',[Validators.required, Validators.minLength(4)]),
      'email':new FormControl('',[Validators.required, Validators.email]),
      'firstname':new FormControl('',[Validators.required, Validators.minLength(2)]),
      'lastname':new FormControl('',[Validators.required, Validators.minLength(2)]),
      'birthDate':new FormControl(''),
      'address':new FormControl('')  
    });  
    this.imageForm= new FormGroup({
      'image':new FormControl(null)
    });
    let tokens = localStorage.getItem("token"); 
    if(tokens==null)
      return;
    let token=this.helper.decodeToken(tokens);
    this.isGoogle=token.isGoogle;
    this.userService.GetUser((token as TokenData).username).subscribe(
      (data : User) => {  
        this.user=data;
        this.profileForm= new FormGroup({
          'username':new FormControl(this.user?.username,[Validators.required, Validators.minLength(4)]),
          'password':new FormControl(''),
          'email':new FormControl(this.user?.email,[Validators.required, Validators.email]),
          'firstname':new FormControl(this.user?.firstname,[Validators.required, Validators.minLength(2)]),
          'lastname':new FormControl(this.user?.lastname,[Validators.required, Validators.minLength(2)]),
          'birthDate':new FormControl(this.user?.birthDate.substring(0,10)),
          'address':new FormControl(this.user?.address) ,  
        });
      }
    ); 
    this.DodajSliku();
  }

  ngOnInit(): void {
  }
  onFileChange(event:Event):void
  {  
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
        return;
    }

    const file = input.files[0]; 
    const formData = new FormData();
    formData.append('file', file, file.name);

    this.userService.UploadImage(formData).subscribe(
      (data : Object) => { 
        if(data){
          alert("Uspesno izmenjeni podaci");
          this.DodajSliku();
        }
        else
          alert("Doslo je do greske");
    },
    error => {
      alert("Greska u komunikaciji sa serverom");
    }
      
    ); 
  }
  change():void
  {
    if(this.profileForm.valid)
    {
      let user:User=new User();
      user.username=this.profileForm.value['username'];
      user.password=this.profileForm.value['password'];
      user.email=this.profileForm.value['email'];
      user.firstname=this.profileForm.value['firstname'];
      user.lastname=this.profileForm.value['lastname'];
      user.birthDate=this.profileForm.value['birthDate'];
      user.address=this.profileForm.value['address']; 
      user.id=this.user.id;
      user.type=this.user.type;
      this.userService.EditUser(user).subscribe(
        (data : Object) => { 
          alert("Uspesno izmenjeni podaci");
          
      },
      error => {
        alert("Greska u komunikaciji sa serverom");
      }
        
      );
    }
    
  }   
  image:Blob=new Blob();
  imageURL:SafeUrl ="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  DodajSliku() {
    let tokens = localStorage.getItem("token"); 
    if(tokens==null)return;
    let token=this.helper.decodeToken(tokens);
    if((token as TokenData).isGoogle=="true")
    {
      this.userService.GetImageGoogle().subscribe(
        (data)=>
        { 
          this.imageURL = data.url;
        }
      )
    }
    else{
        this.userService.GetImage().subscribe(
          (response)=>
          {
            this.image = response;
            this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image));
          }
        )
    }
  }
 
}