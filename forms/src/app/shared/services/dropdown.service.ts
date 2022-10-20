import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estados } from '../models/estados.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(): Observable<Estados[]> {
    return this.http.get<Estados[]>('assets/dados/estados.json')
  }

  getCargos() {
    return [
      {nome: 'Desenvolvedor', nivel: 'Junior', desc: 'Desenvolvedor Junior'},
      {nome: 'Desenvolvedor', nivel: 'Pleno', desc: 'Desenvolvedor Pleno'},
      {nome: 'Desenvolvedor', nivel: 'Senior', desc: 'Desenvolvedor Senior'},
    ]
  }

  getTecnologias() {
    return [
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'java', desc: 'Java'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'},
      {nome: 'python', desc: 'Python'},
    ]
  }
}
