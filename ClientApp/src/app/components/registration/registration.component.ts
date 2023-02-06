import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm:FormGroup;
  constructor(private userService:UserService,private router: Router) { 
    this.registrationForm=new FormGroup({
      'username':new FormControl('',[Validators.required, Validators.minLength(4)]),
      'password':new FormControl('',[Validators.required, Validators.minLength(4)]),//TODO: izmeniti
      'email':new FormControl('',[Validators.required, Validators.email]),
      'firstname':new FormControl('',[Validators.required, Validators.minLength(2)]),
      'lastname':new FormControl('',[Validators.required, Validators.minLength(2)]),
      'birthDate':new FormControl(''),
      'address':new FormControl(''),
      'usertype':new FormControl('',Validators.required),
      'password2':new FormControl('',[Validators.required, Validators.minLength(4)]) 
 
    });
  }
  ngOnInit(): void {
    this.registrationForm=new FormGroup({
      'username':new FormControl('',[Validators.required, Validators.minLength(4)]),
      'password':new FormControl('',[Validators.required, Validators.minLength(4)]),//TODO: izmeniti
      'email':new FormControl('',[Validators.required, Validators.email]),
      'firstname':new FormControl('',[Validators.required, Validators.minLength(2)]),
      'lastname':new FormControl('',[Validators.required, Validators.minLength(2)]),
      'birthDate':new FormControl(''),
      'address':new FormControl(''),
      'usertype':new FormControl('',Validators.required),
      'password2':new FormControl('',[Validators.required, Validators.minLength(4)])  
    });
  }
  registration():void
  {
    if(this.registrationForm.valid)
    {  
      let user=new User(); 
      user.username=this.registrationForm.value['username'];
      user.email=this.registrationForm.value['email'];
      user.password=this.registrationForm.value['password'];
      user.firstname=this.registrationForm.value['firstname'];
      user.lastname=this.registrationForm.value['lastname'];
      user.birthDate=this.registrationForm.value['birthDate'];
      user.address=this.registrationForm.value['address'];
      user.type=this.registrationForm.value['usertype'];
      if(user.password!=this.registrationForm.value['password2'])
      {
        alert("Ponovljena lozinka nije ista");
        return;
      }
      //todo slika 
     
      this.userService.registration(user).subscribe(
        (data : boolean) => {
          if(data)
          {
            alert("Uspesna registracija");
            this.router.navigateByUrl("/login");
          }
          else
          {
            alert("Korisnik vec postoji");
          }
        },
        error => {
          alert("Greska u komunikaciji");
        }
      ); 
    }
       
    else
    {
      alert("Doslo je do greske");
    } 
  }
}
