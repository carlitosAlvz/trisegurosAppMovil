import { Component, OnInit } from '@angular/core';
import { NativeBiometric, AvailableResult } from 'capacitor-native-biometric';
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
}
