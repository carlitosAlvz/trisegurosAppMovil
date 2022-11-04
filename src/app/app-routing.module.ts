import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register-form',
    loadChildren: () => import('./pages/register-form/register-form.module').then( m => m.RegisterFormPageModule)
  },
  {

    path: 'face-id',
    loadChildren: () => import('./pages/face-id/face-id.module').then( m => m.FaceIdPageModule)},
    {path: 'pwa',
    loadChildren: () => import('./pages/pwa/pwa.module').then( m => m.PwaPageModule)
  },
  {
    path: 'login-form',
    loadChildren: () => import('./pages/login-form/login-form.module').then( m => m.LoginFormPageModule)
  },
  {
    path: 'aviso-privacidad',
    loadChildren: () => import('./pages/aviso-privacidad/aviso-privacidad.module').then( m => m.AvisoPrivacidadPageModule)
  },  {
    path: 'recovery-password',
    loadChildren: () => import('./pages/recovery-password/recovery-password.module').then( m => m.RecoveryPasswordPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
