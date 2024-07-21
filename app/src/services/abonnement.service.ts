// src/app/services/abonnement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  private apiUrl = 'http://localhost:3001'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  createAbonnement(formationId: string, userId: string, stripeToken: any): Observable<any> {
    const abonnement = { formation: formationId, IdUser: userId, stripeToken: stripeToken };
    return this.http.post(`${this.apiUrl}/abonnements`, abonnement);
  }

  getallabo(): Observable<any> {;
    return this.http.get(`${this.apiUrl}/abos`);
  }
}
