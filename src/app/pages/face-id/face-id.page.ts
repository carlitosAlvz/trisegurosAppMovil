import { Component, OnInit } from '@angular/core';
import {
  AvailableResult,
  BiometryType,
  NativeBiometric,
} from 'capacitor-native-biometric';

@Component({
  selector: 'app-face-id',
  templateUrl: './face-id.page.html',
  styleUrls: ['./face-id.page.scss'],
})
export class FaceIdPage implements OnInit {

  constructor() { }

  ngOnInit() {
   this.performBiometricVerificatin();
  }


  async performBiometricVerificatin(){
    const result = await NativeBiometric.isAvailable();
  
    if(!result.isAvailable){
      console.log("native biometric no available")
    }
      
   
  }

 

  

}
