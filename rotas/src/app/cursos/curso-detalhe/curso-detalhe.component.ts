import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.scss']
})
export class CursoDetalheComponent implements OnInit {

  id: string = '';
  inscricao: Subscription = new Subscription();
  curso: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService,
    
    ) {}

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe((params: any) => this.id = params['id']);
    // this.id = this.route.snapshot.params['id'];
    this.curso = this.cursosService.getCurso(Number(this.id))

    if(this.curso == null) {
      this.router.navigate(['/cursos/naoEncontrado'])
    }
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

}
