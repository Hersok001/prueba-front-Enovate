import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario:Usuario; 

  
  constructor(private authService: AuthService, private router: Router) {   
    this.usuario=new Usuario()   
  }

  ngOnInit(): void {   
    if(this.authService.isLoggedIn){ 
      Swal.fire('Login', `Hola ${this.authService.usuario.login} ya está autenticado!`,'info'); 
    }
  }

   login(usuario: Usuario):void{
    if(this.usuario.usuario == null || this.usuario.password == null){
      Swal.fire('Error', 'Username o password vacíos','error');  
      return;
    }

    this.authService.login(this.usuario.usuario,this.usuario.password)  
    .subscribe(response => {
                   
      Swal.fire('Bienvenido',` ${this.usuario.usuario}!`, 'success');
    },error => {   
        Swal.fire('Error','La contraseña o el usuario son erroneos', 'error');     
    }  
    );
  }

  


}
