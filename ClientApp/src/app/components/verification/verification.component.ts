import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  users:Array<User>=new Array<User>();
  constructor(private userService:UserService) { 
    userService.GetUndelivered().subscribe(
      (data:Array<User>)=>
      {
        this.users=data;
         
      });
  }

  ngOnInit(): void {
  }
  Verify(id:number):void
  {
    this.userService.verifyUser(id,true).subscribe(
      (data:boolean)=>
      {
        if(data)
        {
          alert("Uspesno izvrseno");
          this.users=this.users.filter(x=>x.id!=id);
        }
        else
        {
          alert("Doslo je do greske");
        }
      });
  }
  Dismiss(id:number):void
  {
    this.userService.verifyUser(id, false).subscribe(
      (data:boolean)=>
      {
        if(data)
        {
          alert("Uspesno verifikovan");
          this.users=this.users.filter(x=>x.id!=id);
        }
        else
        {
          alert("Doslo je do greske");
        }
      });
  }
}
