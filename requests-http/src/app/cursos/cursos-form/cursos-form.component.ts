import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalServiceService } from 'src/app/shared/alert-modal-service.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private cursosService: CursosService, private alertModalService: AlertModalServiceService, private location: Location) {
    this.form = this.fb.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  hasError(field: string) {
    return this.form.get(field)?.errors
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.cursosService.create(this.form.value).subscribe(
        (success) => {
          this.alertModalService.showAlertSuccess('Curso criado com sucesso.')
          this.location.back();
        },
        (error) => {
          this.alertModalService.showAlertDanger('Erro ao criar curso, tente novamente.')
        },
        () => console.log('Request completo')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
