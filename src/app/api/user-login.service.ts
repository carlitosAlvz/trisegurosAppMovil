import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  servidor='https://triseguros.clubmaple.com/api/user/login';
  constructor(private httpClient: HttpClient, private httpHeaders:HttpClientModule) { }

  postLogin(user:string, password:string):any{
    const body={user:user, password:password};
    const headers = new HttpHeaders({
      'cb-token': 'HFJJ533/(S(*'     
    });
    const requestOptions = { headers: headers };
    return this.httpClient.post(`${this.servidor}`,body,requestOptions);
  }
}
