import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensoresService {
  private baseUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) { }

  // Método para llamar al backend y obtener todos los sensores
  getAllSensors(): Observable<any[]> {
    const url = `${this.baseUrl}/sensors/findAll`;
    return this.http.get<any[]>(url);
  }


}
