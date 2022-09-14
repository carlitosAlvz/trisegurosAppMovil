import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  bandBotones: Boolean = true;
  bandLogin: Boolean = false;
  horizontalStepperForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contra: new FormControl('', Validators.required),
  })
  constructor(private route: ActivatedRoute,
    private router: Router  ) { 
  }

  ngOnInit() {
  }
  cambiodeInterfaz(){
    console.log("si entro");
    this.bandBotones = false;
    this.bandLogin = true;
  }

  enviarDatos(){
    const {usuario, contra} =this.horizontalStepperForm.value
    console.log(usuario+" "+contra)
    this.router.navigate(['/pwa']);
  }
}
