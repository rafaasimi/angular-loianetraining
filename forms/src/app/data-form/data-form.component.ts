import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Estados } from '../shared/models/estados.model';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;
  estados: Estados[];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dropDownService: DropdownService) {}

  ngOnInit(): void {
    // 1ª FORMA DE CRIAR FORMULARIO
    // this.formulario = new FormGroup({
    //   nome: new FormControl('Rafael'),
    //   email: new FormControl(null),
    //   endereco: new FormGroup({
    //     cep: new FormControl(null),
    //     numero: new FormControl(null)
    //   })
    // });

    // 2º FORMA DE CRIAR FORMULARIO
    this.formulario = this.formBuilder.group({
      dadosPessoais: this.formBuilder.group({
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [null, [Validators.required, Validators.email]],
      }),
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });

    this.dropDownService.getEstadosBr()
    .subscribe(dados => console.log(dados))

  }

  onSubmit() {
    console.log(this.formulario.value);

    if(this.formulario.valid) {
      this.http
      .post('/enderecoServer/formUsuario',JSON.stringify(this.formulario.value))
      .subscribe(
        (response) => {
          console.log(response);

          // Reseta o formulário
          this.resetarFormulario();
        },
        (error: any) => alert('Erro ao enviar o formulário.' + error)
      );
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
   
  }

  // Percorre todos os FormGroups e seus controles
  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();

      if(controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    })
  }

  resetarFormulario() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched
  }

  verificaEmailInvalido() {
    if(this.formulario.get('dadosPessoais.email').errors) {
      return this.formulario.get('dadosPessoais.email').errors['email'] && this.formulario.get('dadosPessoais.email').touched
    }
  }

  aplicaCssErro(campo: string) {
    return {'is-invalid': this.verificaValidTouched(campo)}
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;

    // Limpa tudo o que for caracter deixando apenas numeros
    cep = cep.replace(/\D/g, '')

    // Verifica se a variável CEP possuí valor
    if(cep != '') {
      // Regex para validar CEP
      let validacep = /^[0-9]{8}$/
      
      // Valida o formato do CEP
      if(validacep.test(cep)){
        this.resetaDadosForm();
        
        this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe(dados => this.popularDadosForm(dados))
      }
    }
  }

  popularDadosForm(dados) {
    this.formulario.patchValue({
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

  resetaDadosForm() {
    this.formulario.patchValue({
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
