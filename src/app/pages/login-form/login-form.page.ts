
import { Component, OnInit } from '@angular/core';
import { NativeBiometric, AvailableResult, BiometryType } from 'capacitor-native-biometric';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Plugins, PluginResultError } from '@capacitor/core';
import { UserLoginService } from '../../api/user-login.service';
import { HomePageService } from '../../api/home-page.service'
import {MatDialog} from '@angular/material/dialog'
import { ForgetPasswordComponent } from 'src/app/dialog/forget-password/forget-password.component'; 
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {

  bandLogin: Boolean = false;
  bandForm: Boolean = true;
  bandFail:Boolean=false;
  name: string = ""
  horizontalStepperForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contra: new FormControl('', Validators.required),
  })
  horizontalStepperForm2 = new FormGroup({
    contraLocal: new FormControl('', Validators.required),
  })
  constructor(private route: ActivatedRoute,
    private router: Router, private apis: UserLoginService, private apiHome: HomePageService,
     public dialog: MatDialog) {
  }

  ngOnInit() {
    if (localStorage.length <= 1) {
      this.bandLogin = false;
      this.bandForm = true;
    } else {
      this.bandLogin = true;
      this.bandForm = false;
      this.name = localStorage.getItem("name");
    }

  }




  enviarDatos() {
      const { usuario, contra } = this.horizontalStepperForm.value
      //var encriptar=CryptoJS.AES.encrypt(contra, contra).toString()
      this.apis.postLogin(usuario, contra).subscribe((res: any) => {
        console.log(res)
        if(res.status=="login fail"){
          this.bandFail=true;
        }else{
          localStorage.setItem("name", res.user_name)
          localStorage.setItem("usuario", usuario)
          localStorage.setItem("contraseña", contra)
          localStorage.setItem("user_id", res.user_id)
          localStorage.setItem("user_token", res.user_token)
          this.router.navigate(['/pwa']);
        }
        //
      });

  }

  eliminarCuenta() {
    this.bandLogin = false;
    this.bandForm = true;
    localStorage.clear()
    this.router.navigate(['/']);
  }

  enviarDatosLocal() {
    
      const { contraLocal } = this.horizontalStepperForm2.value
      //var encriptar=CryptoJS.AES.encrypt(contraLocal, contraLocal).toString()
      var usuario=localStorage.getItem("usuario")
      this.apis.postLogin(usuario, contraLocal).subscribe((res: any) => {
        console.log(contraLocal)
        console.log(res)
        if(res.status=="login fail"){
          this.bandFail=true;
        }else{
          localStorage.setItem("name", res.user_name)
          this.router.navigate(['/pwa']);
        }
        //
      });

  }

  setCredential() {
    // Save user's credentials
    NativeBiometric.setCredentials({
      username: localStorage.getItem("usuario"),
      password: localStorage.getItem("contraseña"),
      server: 'www.example.com',
    }).then();
  }

  deleteCredential() {
    // Delete user's credentials
    NativeBiometric.deleteCredentials({
      server: 'www.example.com',
    });
  }

  checkCredential() {
    NativeBiometric.isAvailable().then((result: AvailableResult) => {
      const isAvailable = result.isAvailable;
      if (isAvailable) {
        // Get user's credentials
        NativeBiometric.getCredentials({
          server: 'www.example.com',
        }).then((credentials) => {
          // Authenticate using biometrics before logging the user in
          NativeBiometric.verifyIdentity({
            reason: 'For easy log in',
            title: 'Tri Seguros',
            subtitle: 'Ingrese su huella digital',
            description: '',
          })
            .then(() => {
              //     // Authentication successful
              this.router.navigate(['/pwa']);
              //     // this.login(credentials.username, credentials.password);
            })
            .catch((err) => {
              //   // Failed to authenticate
              alert('La huella no coincide');
            });
        });
      }
    });
  }

  openDialog():void{
    const dialogRef=this.dialog.open(ForgetPasswordComponent,{
      width:'300px',
      data:'Olvidaste tu contraseña'
    })
    dialogRef.afterClosed().subscribe(res=>{
      console.log(res)
    });
  }

  checkCredentialFaceId() {
    const { FaceId } = Plugins;

    // check if device supports Face ID or Touch ID
    FaceId.isAvailable().then(checkResult => {
      if (checkResult.value) {
        FaceId.auth().then(() => {
          console.log('authenticated');
        }).catch((error: PluginResultError) => {
          // handle rejection errors
          console.error(error.message);
        });
      } else {
        // use custom fallback authentication here
      }
    });
  }

}
