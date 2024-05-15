import { Component, Input, OnInit } from '@angular/core';
import { LoginComponent } from '../login.component';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() usuario: Usuario;
  
  constructor(private loginComponent: LoginComponent) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.loginComponent.login(this.usuario);
  }

}
