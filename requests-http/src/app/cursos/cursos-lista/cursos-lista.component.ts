import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  cursoSelecionado: Curso = { id: null, nome: null };

  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  constructor(
    private cursosService: CursosService,
    private alertService: AlertModalServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    // this.cursosService.list().subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
    // Maneira 1
    this.cursos$ = this.cursosService.list().pipe(
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
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.'
    );
  }

  onEdit(id: number | null) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });
  }

  onConfirmDelete() {
    this.deleteModalRef?.hide();
    if (this.cursoSelecionado.id) {
      this.cursosService.remove(this.cursoSelecionado.id).subscribe(
        (success) => {
          this.onRefresh();
        },
        (error) => {
          this.alertService.showAlertDanger(
            'Erro ao remover curso. Tente novamente mais tarde.'
          );
        }
      );
    }
  }

  onDeclineDelete() {
    this.deleteModalRef?.hide();
  }
}
