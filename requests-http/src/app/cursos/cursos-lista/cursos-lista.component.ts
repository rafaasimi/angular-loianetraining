import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[] = [];
  cursos$: Observable<Curso[]> | undefined

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    // this.cursosService.list().subscribe(dados => this.cursos = dados);

    this.cursos$ = this.cursosService.list()
  }

}
