import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaCepService {
  constructor(private http: HttpClient) {}

  consultaCEP(cep: string): Observable<any> {
    // Limpa tudo o que for caracter deixando apenas numeros
    cep = cep.replace(/\D/g, '');

    // Verifica se a variável CEP possuí valor
    if (cep != '') {
      // Regex para validar CEP
      let validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP
      if (validacep.test(cep)) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
      }
    }

    return of ({})
  }
}
