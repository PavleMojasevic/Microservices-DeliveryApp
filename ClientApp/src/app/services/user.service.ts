import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment'; 
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from '../models/token.model';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { SocialUser } from 'angularx-social-login';
import { url } from '../models/url.model';
   
@Injectable({
  providedIn: 'root'
})
export class UserService {
  GetImageGoogle():Observable<url> {
    return this.http.get<url>(environment.userServiceUrl + '/api/users/imagegoogle');
  }
  GetImage()  :Observable<Blob> {
    return this.http.get(environment.userServiceUrl + '/api/users/image', { responseType: 'blob' });
  }
  UploadImage(image: any) :Observable<boolean>{
    return this.http.post<boolean>(environment.userServiceUrl + '/api/users/uploadImage', image); 
  }
  loginGoogle(user: User):Observable<Token> {
    return this.http.post<Token>(environment.userServiceUrl + '/api/users/LoginGoogle',user);
  }
  GetUndelivered():Observable<Array<User>>{
    return this.http.get<Array<User>>(environment.userServiceUrl + '/api/users/Unactivated');
  }
  constructor(private http:HttpClient) {
    
   }
   GetUser(username: string|null):Observable<User>{ 
     return this.http.get<User>(environment.userServiceUrl + '/api/users/username/'+username);
   }
   GetUserById(id: number|undefined):Observable<User>{ 
     return this.http.get<User>(environment.userServiceUrl + '/api/users/'+id);
   }
   registration(user: User) :Observable<boolean>{ 
     return this.http.post<boolean>(environment.userServiceUrl + '/api/users', user); 
   }
   verifyUser(userid: number, response:boolean) :Observable<boolean>{ 
     if(response)
        return this.http.post<boolean>(environment.userServiceUrl + '/api/users/verifyUser', userid); 
     return this.http.post<boolean>(environment.userServiceUrl + '/api/users/dismissUser',userid); 
   }
 
 
  login(login:Login) :Observable<Token> { 
   return this.http.post<Token>(environment.userServiceUrl + '/api/users/login', login); 
  } 
  EditUser(user:User):Observable<Token>{ 
    return this.http.post<Token>(environment.userServiceUrl + '/api/users/put', user); 
  }
}

