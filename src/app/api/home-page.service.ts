import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  servidor='https://triseguros.clubmaple.com/';
  constructor(private httpClient: HttpClient, private httpHeaders:HttpClientModule) { }

  postHomePage(user_id:string, user_token:string):any{
    
    const requestOptions: Object = {
      responseType: 'text'
    }    
    
    return this.httpClient.get(`${this.servidor}`, requestOptions);
    
  }
}
