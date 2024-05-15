import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario: Usuario | undefined;
  private _token: string | null = null;
  private _isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  
  get usuario(): any {
    if (!this._usuario && sessionStorage.getItem('usuario')) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    }
    return this._usuario;
  }

  get token(): string | null {
    if (!this._token && sessionStorage.getItem('token')) {
      this._token = sessionStorage.getItem('token');
    }
    return this._token;
  }

  
  login(username: string, password: string): Observable<any> {
    const urlEndPoint = 'http://localhost:8000/auth/login';
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { 'username': username, 'password': password };

    const options = { headers: httpHeaders }; // Incluir las cabeceras en el objeto de opciones de solicitud

    return this.http.post<any>(urlEndPoint, body).pipe(
      map(response => {
        if (response && response.message === 'Inicio de sesión exitoso') {
          this._isLoggedIn = true;
          sessionStorage.setItem('isLoggedIn', 'true');
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout(): boolean {
    this._isLoggedIn = false;
    sessionStorage.removeItem('isLoggedIn');
    return true; 
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  private handleError(error: any): Observable<never> {
    return throwError(error);
  }

}
