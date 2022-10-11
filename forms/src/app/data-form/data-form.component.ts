import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // 1ª FORMA DE CRIAR FORMULARIO
    // this.formulario = new FormGroup({
    //   nome: new FormControl('Rafael'),
    //   email: new FormControl(null),
    // });

    // 2º FORMA DE CRIAR FORMULARIO
    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null],
    });
  }

  onSubmit() {
    console.log(this.formulario.value);

    this.http
      .post('/enderecoServer/formUsuario',JSON.stringify(this.formulario.value))
      .subscribe(
        (response) => {
          console.log(response);

          // Reseta o formulário
          this.resetarFormulario();
        },
        (error: any) => alert('Erro ao enviar o formulário.')
      );
  }

  resetarFormulario() {
    this.formulario.reset();
  }
}
