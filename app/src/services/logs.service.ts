import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:3001/api'; // Ajusté l'URL pour correspondre à votre backend

  constructor(private http: HttpClient) { }

  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/logs`);
  }

  createLog(email: string, action: string, title?: string): Observable<any> {
    const logData = { email, action, title };
    return this.http.post<any>(`${this.apiUrl}/createlogs`, logData);
  }
}
