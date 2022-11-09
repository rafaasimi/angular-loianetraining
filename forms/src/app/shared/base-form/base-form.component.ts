import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent implements OnInit {
  formulario: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  abstract submit();

  onSubmit() {
    if (this.formulario.valid) {
      this.onSubmit();
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

    // Percorre todos os FormGroups e seus controles
    verificaValidacoesForm(formGroup: FormGroup | FormArray) {
      Object.keys(formGroup.controls).forEach((campo) => {
        const controle = formGroup.get(campo);
        controle.markAsTouched();
  
        if (controle instanceof FormGroup || controle instanceof FormArray) {
          this.verificaValidacoesForm(controle);
        }
      });
    }

    resetarFormulario() {
      this.formulario.reset();
    }

    verificaValidTouched(campo: string) {
      return (
        !this.formulario.get(campo).valid && this.formulario.get(campo).touched
      );
    }

    verificaRequired(campo: string) {
      return (
        this.formulario.get(campo).hasError('required') &&
        (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
      );
    }

    verificaEmailInvalido() {
      if (this.formulario.get('dadosPessoais.email').errors) {
        return (
          this.formulario.get('dadosPessoais.email').errors['email'] &&
          this.formulario.get('dadosPessoais.email').touched
        );
      }
    }

    aplicaCssErro(campo: string) {
      return { 'is-invalid': this.verificaValidTouched(campo) };
    }

    getCampo(campo: string) {
      return this.formulario.get(campo);
    }
}
