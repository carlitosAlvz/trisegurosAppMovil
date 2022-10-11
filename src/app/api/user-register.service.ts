import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  servidor='https://triseguros.clubmaple.com/api/user/register';
  constructor(private httpClient: HttpClient, private httpHeaders:HttpClientModule) { }

  postRegister(full_name:string, country_code:string,phone:string,email:string,rfc:string,birthday:string, password:string, code_agent:string):any{
    const body={full_name:full_name, country_code:country_code,phone:phone,
                email:email,rfc:rfc,birthday:birthday, password:password, code_agent:code_agent};
    const headers = new HttpHeaders({     
      'cb-token': 'HFJJ533/(S(*'     
    });
    const requestOptions = { headers: headers };
    return this.httpClient.post(`${this.servidor}`,body,requestOptions);
  }
}
