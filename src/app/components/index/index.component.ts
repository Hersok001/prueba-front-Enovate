import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  version: string;
  usuarioDesc: string;
  clienteDesc: String;
  fechaActual: Date = new Date();

  constructor(private router: Router,
            private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.version = "Versión 0.0";
    this.usuarioDesc = JSON.parse(sessionStorage.getItem('usuario')).login.substring(0, 3);
    this.clienteDesc = JSON.parse(sessionStorage.getItem('usuario')).cliente.descripcion;
    setInterval(() => {
      this.fechaActual = new Date();
    }, 1000);
   
  }

 

 
  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      html: '¿Quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      width: '350px',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          title: '¡Sesión cerrada!',
          text: 'Tu sesión se ha cerrado exitosamente.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }

}
