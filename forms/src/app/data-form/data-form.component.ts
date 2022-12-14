import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { empty, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { FormValidations } from '../shared/form-validations';
import { Cidade } from '../shared/models/cidade.model';
import { Estados } from '../shared/models/estados.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from './services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
  formulario: FormGroup;
  estados: Estados[];
  cidades: Cidade[];
  // estados: Observable<Estados[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOptions: any[];
  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super();
  }

  ngOnInit(): void {
    // this.verificaEmailService.verficiarEmail('email1@email.com')

    this.title.setTitle('Formulários Reativos');
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
        nome: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        email: [
          null,
          [Validators.required, Validators.email],
          [this.validarEmail.bind(this)],
        ],
        confirmarEmail: [
          null,
          [
            Validators.required,
            Validators.email,
            FormValidations.equalsTo('dadosPessoais.email'),
          ],
        ],
      }),
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: [null],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks(),
    });

    // this.estados = this.dropDownService.getEstadosBr();
    this.dropDownService.getEstadosBr()
    .subscribe(dados => this.estados = dados);

    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.newsletterOptions = this.dropDownService.getNewsletter();

    this.formulario
      .get('endereco.cep')
      .statusChanges.pipe(
        distinctUntilChanged(),
        tap((value) => console.log('Status CEP', value)),
        switchMap((status) =>
          status === 'VALID'
            ? this.cepService.consultaCEP(
                this.formulario.get('endereco.cep').value
              )
            : empty()
        )
      )
      .subscribe((dados) => (dados ? this.popularDadosForm(dados) : {}));

    // this.dropDownService.getCidades(8).subscribe(console.log);
    this.formulario.get('endereco.estado').valueChanges
    .pipe(
      tap(estado => console.log('Novo estado:', estado)),
      map(estado => this.estados.filter(e => e.sigla === estado)),
      map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
      switchMap((estadoId: number) => this.dropDownService.getCidades(estadoId)),
      tap(console.log)
    ).subscribe(cidades => this.cidades = cidades);

  }

  buildFrameworks() {
    const values = this.frameworks.map((value) => new FormControl(false));
    return this.formBuilder.array(
      values,
      FormValidations.requiredMinCheckbox(1)
    );
  }

  submit() {
    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign({
      frameworks: valueSubmit.frameworks
        .map((value, index) => (value ? this.frameworks[index] : null))
        .filter((value) => value !== null),
    });

    this.http
      .post(
        '/enderecoServer/formUsuario',
        JSON.stringify(this.formulario.value)
      )
      .subscribe(
        (response) => {
          console.log(response);

          // Reseta o formulário
          this.resetarFormulario();
        },
        (error: any) => alert('Erro ao enviar o formulário.' + error)
      );
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService
        .consultaCEP(cep)
        .subscribe((dados) =>
          Object.keys(dados).length > 0 ? this.popularDadosForm(dados) : null
        );
    }

  }

  popularDadosForm(dados) {
    this.resetaDadosForm();

    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
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
        estado: null,
      },
    });
  }

  setarCargo() {
    const cargo = {
      nome: 'Desenvolvedor',
      nivel: 'Senior',
      desc: 'Desenvolvedor Senior',
    };

    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(cargo1, cargo2) {
    return cargo1 && cargo2
      ? cargo1.nome === cargo2.nome && cargo1.nivel === cargo2.nivel
      : cargo1 && cargo2;
  }

  setarTecnologias() {
    this.formulario
      .get('tecnologias')
      .setValue(['javascript', 'java', 'python']);
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService
      .verificarEmail(formControl.value)
      .pipe(
        map((emailExiste) => (emailExiste ? { emailInvalido: true } : null))
      );
  }
}
