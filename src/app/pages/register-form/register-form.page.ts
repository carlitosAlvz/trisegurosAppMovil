import { Component, OnInit,Injector  } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { UserRegisterService } from '../../api/user-register.service'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.page.html',
  styleUrls: ['./register-form.page.scss'],
})
export class RegisterFormPage implements OnInit {
  horizontalStepperForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')),
    lada: new FormControl(52),
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
  bandRFC=0
  bandRegisterFail:boolean=false
  messageError:any
  ngOnInit() {
    const max = new Date().getFullYear()-18
    const min = max - 100

    for (let i = max; i >= min; i--) {
      this.years.push(i)
    }
  
  }

  actualizarDias(){
   var meses31=["0", "2", "4", "6", "7", "9", "11"]
   var meses30=["3", "5", "8","10"]
   var meses28=["1"]
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
    this.code_agent=localStorage.getItem("code_agent")
    var mesesF=["01","02","03","04","05","06","07","08","09","10","11","12"]
    var mes=mesesF[Number(meses)]
    var diaF=""
    if(Number(dias)<10){
      diaF="0"+dias
    }else{
      diaF=dias+""
    }
  
      this.apis.postRegisterCodeAgent(nombre, lada,numero_telefono,
        correo,rfc,years+"-"+mes+"-"+diaF, contra,this.code_agent).subscribe((res: any)=>{
          if(res.status=="register fail"){
            this.bandRegisterFail=true
            if(res.errors.hasOwnProperty('email')){
              if(res.errors.email.toString()=="The email has already been taken."){
                this.messageError="El correo ya se encuentra registrado"
                var emailError= document.getElementById('inputEmail')
                emailError.style.borderColor="red"
                emailError.style.borderWidth="medium"
              }
            }else if(res.errors.hasOwnProperty('agent_code')){
              if(res.errors.agent_code.toString()=="The agent code must be an integer."){
                this.messageError="El codigo de agente es incorrecto"
              }
            }else{
              this.messageError="Las credenciales son incorrectas"
            }
            
            console.log(res.errors)
          }else{
            localStorage.clear()
            localStorage.setItem("user_id", res.user_id)
            localStorage.setItem("user_token", res.user_token)
            localStorage.setItem("name", nombre)
            localStorage.setItem("usuario", correo)
            localStorage.setItem("contraseña", contra)

            this.router.navigate(['/pwa']);
          }
         
      })
    
    
    
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

  rfcChange(){
    if(this.horizontalStepperForm.controls.rfc.status=="VALID"){
      this.bandRFC=0;
      var rfcError= document.getElementById('inputRfc')
      rfcError.style.borderColor="white"
      rfcError.style.borderWidth="thin"
    }

    if(this.horizontalStepperForm.controls.rfc.status=="INVALID"){
      this.bandRFC=1;
      var rfcError= document.getElementById('inputRfc')
      rfcError.style.borderColor="red"
      rfcError.style.borderWidth="medium"
    }
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

  emailChange(){
    if(this.horizontalStepperForm.controls.correo.status=="VALID"){
      var emailError= document.getElementById('inputEmail')
      emailError.style.borderColor="white"
      emailError.style.borderWidth="thin"
    }

    if(this.horizontalStepperForm.controls.correo.status=="INVALID"){
      var emailError= document.getElementById('inputEmail')
      emailError.style.borderColor="red"
      emailError.style.borderWidth="medium"
    }
  }

  phoneChange(){
    if(this.horizontalStepperForm.controls.numero_telefono.status=="VALID"){
      var phoneError= document.getElementById('inputPhone')
      phoneError.style.borderColor="white"
      phoneError.style.borderWidth="thin"
    }

    if(this.horizontalStepperForm.controls.numero_telefono.status=="INVALID"){
      var phoneError= document.getElementById('inputPhone')
      phoneError.style.borderColor="red"
      phoneError.style.borderWidth="medium"
    }
  }

}
