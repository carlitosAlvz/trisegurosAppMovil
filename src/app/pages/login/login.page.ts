import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  bandBotones: Boolean = true;
  bandLogin: Boolean = false;
  constructor() { 
  }

  ngOnInit() {
  
  }
  cambiodeInterfaz(){
    console.log("si entro");
    this.bandBotones = false;
    this.bandLogin = true;
  }
}
