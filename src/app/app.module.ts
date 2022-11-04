import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ForgetPasswordComponent } from './dialog/forget-password/forget-password.component';

@NgModule({
  declarations: [AppComponent,
                ForgetPasswordComponent
                ],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            BrowserAnimationsModule,
            MatButtonModule,
            MatDialogModule],
            entryComponents:[ForgetPasswordComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
