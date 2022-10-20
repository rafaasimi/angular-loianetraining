import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';


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

  constructor(private http: HttpClient, private cepService: ConsultaCepService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Formulários Template Driven')
  }

  onSubmit(form) {
    console.log(form)
    this.http.post('/enderecoServer/formUsuario', JSON.stringify(form.value))
    .subscribe(response => console.log(response))
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

    if(cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.popularDadosForm(dados, formulario))
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
