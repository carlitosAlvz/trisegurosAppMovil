
import { Component, OnInit } from '@angular/core';
import { NativeBiometric, AvailableResult, BiometryType } from 'capacitor-native-biometric';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Plugins, PluginResultError } from '@capacitor/core';
import { UserLoginService } from '../../api/user-login.service';
import { HomePageService } from '../../api/home-page.service'
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {

  bandLogin: Boolean = false;
  bandForm: Boolean = true;
  name: string = ""
  horizontalStepperForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contra: new FormControl('', Validators.required),
  })
  constructor(private route: ActivatedRoute,
    private router: Router, private apis: UserLoginService, private apiHome: HomePageService) {
  }

  ngOnInit() {
    if (localStorage.length == 0) {
      this.bandLogin = false;
      this.bandForm = true;
    } else {
      this.bandLogin = true;
      this.bandForm = false;
      this.name = localStorage.getItem("usuario");
    }

  }




  enviarDatos() {
    if (localStorage.length == 0) {
      const { usuario, contra } = this.horizontalStepperForm.value
      localStorage.setItem("usuario", usuario)
      localStorage.setItem("contraseña", contra)
      this.apis.postLogin(usuario, contra).subscribe((res: any) => {
        localStorage.setItem("user_id", res.user_id)
        localStorage.setItem("user_token", res.user_token)
        this.router.navigate(['/pwa']);
      });

    } else {
      this.router.navigate(['/pwa']);
    }

  }

  eliminarCuenta() {
    this.bandLogin = false;
    this.bandForm = true;
    localStorage.clear()
    this.router.navigate(['/']);
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
