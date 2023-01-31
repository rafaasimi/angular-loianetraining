import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
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

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private alertModalService: AlertModalServiceService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [null],
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

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id)
    //     this.cursosService.loadByID(id).subscribe(
    //       (curso) => this.updateForm(curso)
    //     )
    //   }
    // )

    this.route.params
      .pipe(
        map((params): any => params['id']),
        switchMap((id) => this.cursosService.loadByID(id))
      )
      .subscribe((curso) => this.updateForm(curso));

      // concatMap => Ordem da requisição importa, as requisições são feitas simultaneamente, mas a resposta é na ordem em que foi declarada
      // mergeMap => Ordem da requisição não importa e o retorno é baseado na que terminou primeiro
      // exhaustMap => Executa a primeira requisição, aguarda a resposta para seguir para o proximo
  }

  updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome,
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.cursosService.create(this.form.value).subscribe(
        (success) => {
          this.alertModalService.showAlertSuccess('Curso criado com sucesso.');
          this.location.back();
        },
        (error) => {
          this.alertModalService.showAlertDanger(
            'Erro ao criar curso, tente novamente.'
          );
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
