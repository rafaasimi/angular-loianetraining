import { Component, OnInit } from '@angular/core';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  nomePortal = 'http://loiane.training'
  linguagens: string[] = []

  constructor(private cursosService: CursosService) {
    this.linguagens = this.cursosService.getCursos()
   }

  ngOnInit(): void {
  }


}
