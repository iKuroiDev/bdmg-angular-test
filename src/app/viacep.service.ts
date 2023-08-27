import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CEPInterface } from './interfaces/cep.interface';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  apiUrl = 'https://viacep.com.br/ws'

  constructor(private http: HttpClient) { }

  getResponse(cep: string): Observable<CEPInterface> {
    return this.http.get<CEPInterface>(`${this.apiUrl}/${cep}/json`);
  }
}
