import { Component, OnInit } from '@angular/core';
import { NativeBiometric, AvailableResult } from 'capacitor-native-biometric';
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
  bandForm: Boolean = false;

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
    this.bandBotones = false;
    this.bandForm = false;
    this.bandLogin = true;
    this.setCredential()
  }

  setCredential() {
    // Save user's credentials
    NativeBiometric.setCredentials({
      username: 'username',
      password: 'password',
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
      // const isFaceId=result.biometryType==BiometryType.FACE_ID;
      // const isFaceId = result.biometryType == BiometryType.FACE_ID;

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
              alert('SUCCESS!!');
              //     // this.login(credentials.username, credentials.password);
            })
            .catch((err) => {
              //   // Failed to authenticate
              alert('FAIL!');
            });
        });
      }
    });
  }

  enviarDatos(){
    const {usuario, contra} =this.horizontalStepperForm.value
    console.log(usuario+" "+contra)
    this.router.navigate(['/pwa']);
  }
}
