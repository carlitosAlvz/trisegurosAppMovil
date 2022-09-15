import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.page.html',
  styleUrls: ['./register-form.page.scss'],
})
export class RegisterFormPage implements OnInit {
  horizontalStepperForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    lada: new FormControl('', Validators.required),
    numero_telefono: new FormControl('', Validators.required),
    rfc: new FormControl('', Validators.required),
    fecha_nacimiento: new FormControl('', Validators.required),
    contra: new FormControl('', Validators.required),
    confirmar_contra: new FormControl('', Validators.required),
    aviso_privacidad: new FormControl('', Validators.required),
  })
  constructor( private router: Router  ) { }

  ngOnInit() {
  }

  enviarRegistro(){
    const {nombre,correo,lada,numero_telefono,rfc,fecha_nacimiento,contra,confirmar_contra}
    = this.horizontalStepperForm.value
    var data={
      nombre: nombre,
      correo:correo,
      numero_telefono: lada+numero_telefono,
      rfc:rfc,
      fecha_nacimiento:fecha_nacimiento,
      contraseña:contra
    }
    console.log(data)
    this.router.navigate(['/pwa']);
  }

}
