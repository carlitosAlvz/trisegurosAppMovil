import { Component, OnInit,Injector  } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { UserRegisterService } from '../../api/user-register.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.page.html',
  styleUrls: ['./register-form.page.scss'],
})
export class RegisterFormPage implements OnInit {
  horizontalStepperForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')),
    lada: new FormControl('+52'),
    numero_telefono: new FormControl('', Validators.pattern('^[0-9]{1,10}$')),
    rfc: new FormControl('', Validators.pattern('^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$')),
    contra: new FormControl('', Validators.required),
    confirmar_contra: new FormControl('', Validators.required),
    aviso_privacidad: new FormControl('', Validators.required),
    dias: new FormControl('', Validators.required),
    meses: new FormControl('', Validators.required),
    years: new FormControl('', Validators.required),
  })
  constructor( private router: Router, private apis: UserRegisterService,private injector: Injector) { }
  bandAviso=true
  code_agent=""
  dias=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  meses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  years=[]
  bandContra=0
  ngOnInit() {
    const max = new Date().getFullYear()-18
    const min = max - 100

    for (let i = max; i >= min; i--) {
      this.years.push(i)
    }
  
  }

  actualizarDias(){
   var meses31=["Enero", "Marzo", "Mayo", "Julio", "Agosto", "Octubre", "Diciembre"]
   var meses30=["Abril", "Junio", "Septiembre","Noviembre"]
   var meses28=["Febrero"]
   const {meses}=this.horizontalStepperForm.value
   if(meses31.indexOf(meses)>-1){
    this.dias=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
   }else if(meses30.indexOf(meses)>-1){
    this.dias=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
   }else{
    this.dias=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
   }
  }

  enviarRegistro(){
    
    const {nombre,correo,lada,numero_telefono,rfc,contra,confirmar_contra, aviso_privacidad, dias, meses, years}
    = this.horizontalStepperForm.value
    
    this.apis.postRegister(nombre, lada,numero_telefono,
      correo,rfc,dias+"/"+meses+"/"+years, contra,this.code_agent).subscribe((res: any)=>{
        localStorage.setItem("user_id", res.user_id)
        localStorage.setItem("user_token", res.user_token)
    })
    this.router.navigate(['/pwa']);
  }

  revisarContras(){
    const {contra, confirmar_contra}=this.horizontalStepperForm.value
    if(contra!=confirmar_contra){
      this.bandAviso=true
      this.bandContra=1;
    }else{
      this.bandAviso=false
      this.bandContra=2;
    }
  }

  regresarInicio(){
    this.router.navigate(['/login-form']);
  }

  terminos(){
    const {aviso_privacidad}= this.horizontalStepperForm.value
    if(this.bandContra==2){
      if(aviso_privacidad){
        this.bandAviso=false
      }else{
        this.bandAviso=true;
      }
    }
   
  }

}
