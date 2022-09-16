import { Component, OnInit } from '@angular/core';
import { NativeBiometric, AvailableResult, BiometryType } from 'capacitor-native-biometric';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Plugins, PluginResultError } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  bandBotones: Boolean = true;
  bandLogin: Boolean = false;
  bandForm: Boolean = false;
  name: string = ""
  horizontalStepperForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contra: new FormControl('', Validators.required),
  })
  constructor(private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

  }
  cambiodeInterfaz() {
    if (localStorage.length == 0) {
      this.bandBotones = false;
      this.bandForm = true;
      this.bandLogin = false;
    } else {
      this.name = localStorage.getItem("usuario")
      this.bandBotones = false;
      this.bandForm = false;
      this.bandLogin = true;
    }

    this.setCredential()
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

  enviarDatos() {
    const { usuario, contra } = this.horizontalStepperForm.value
    localStorage.setItem("usuario", usuario)
    localStorage.setItem("contraseña", contra)
    console.log(usuario + " " + contra)
    this.router.navigate(['/pwa']);
  }

  eliminarCuenta(){
    this.bandBotones= true;
    this.bandLogin = false;
    this.bandForm = false;
    localStorage.clear()
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
