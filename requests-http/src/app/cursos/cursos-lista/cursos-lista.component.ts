import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, Observable, of, Subject, switchMap, take } from 'rxjs';
import { AlertModalServiceService } from 'src/app/shared/alert-modal.service';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';

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
    // private cursosService: CursosService,
    private cursos2Service: Cursos2Service,
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
    this.cursos$ = this.cursos2Service.list().pipe(
      catchError((error) => {
        console.log(error);
        this.handleError();
        this.error$.next(true);
        return of();
      })
    );

    // Maneira 2
    this.cursos2Service
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
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {
    //   class: 'modal-sm',
    // });

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.cursos2Service.remove(curso.id!) : EMPTY)
    ).subscribe(
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

  onConfirmDelete() {
    this.deleteModalRef?.hide();
    if (this.cursoSelecionado.id) {
      this.cursos2Service.remove(this.cursoSelecionado.id).subscribe(
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
