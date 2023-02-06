import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, Subject } from 'rxjs';
import { AlertModalServiceService } from 'src/app/shared/alert-modal-service.service';
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

  constructor(private cursosService: CursosService, private alertService: AlertModalServiceService, private router: Router, private route: ActivatedRoute) {}

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

  onEdit(id: number | null) {
    this.router.navigate(['editar', id], {relativeTo: this.route})
  }
  
}
