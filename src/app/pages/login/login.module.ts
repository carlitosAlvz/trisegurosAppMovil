import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeBiometric } from 'capacitor-native-biometric';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Plugins, PluginResultError } from '@capacitor/core';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {
  

}
