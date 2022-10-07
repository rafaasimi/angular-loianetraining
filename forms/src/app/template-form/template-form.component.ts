import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: '',
    email: ''
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form) {
    console.log(form)
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {'is-invalid': this.verificaValidTouched(campo)}
  }

  consultaCEP(cep, formulario) {
    // Limpa tudo o que for caracter deixando apenas numeros
    cep = cep.replace(/\D/g, '')

    // Verifica se a variável CEP possuí valor
    if(cep != '') {
      // Regex para validar CEP
      let validacep = /^[0-9]{8}$/
      
      // Valida o formato do CEP
      if(validacep.test(cep)){
        this.resetaDadosForm(formulario)
        
        this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe(dados => this.popularDadosForm(dados, formulario))
      }
    }
  }

  popularDadosForm(dados, formulario) {
    console.log(formulario)
    
    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        cep: null,
        numero: null,
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

}
