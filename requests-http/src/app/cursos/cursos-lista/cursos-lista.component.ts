import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, Observable, of, Subject } from 'rxjs';
import { AlertModalServiceService } from 'src/app/shared/alert-modal-service.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[] = [];
  cursos$: Observable<Curso[]> | undefined;
  error$ = new Subject<boolean>();

  constructor(private cursosService: CursosService, private alertService: AlertModalServiceService) {}

  ngOnInit(): void {
    // this.cursosService.list().subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
    // Maneira 1
    this.cursos$ = this.cursosService.list()
    .pipe(
      catchError((error) => {
        console.log(error);
        this.handleError();
        this.error$.next(true);
        return of();
      })
    );

    // Maneira 2
    this.cursosService
      .list()
      .pipe(
        catchError((error) => {
          console.log(error);
          return of();
        })
      )
      .subscribe(
        (dados) => console.log(dados),
        (error) => console.error(error),
        () => console.log('Observable completo!')
      );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }
  
}
