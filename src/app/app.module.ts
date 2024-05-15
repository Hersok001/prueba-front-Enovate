import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import localeEs from '@angular/common/locales/es-CO';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './components/index/index.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { AppRoutingModule } from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import { IndicadorPrincipalComponent } from './components/index/indicador-principal/indicador-principal.component';



registerLocaleData(localeEs,'es')


const routes:Routes = [
  {path:'', redirectTo: '/monitoreoDatos', pathMatch:'full'},//HOME
  {path:'monitoreoDatos', component:IndicadorPrincipalComponent},
  {path:'**',     redirectTo:'/monitoreoDatos'}
]


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    LoginFormComponent,
    IndicadorPrincipalComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
