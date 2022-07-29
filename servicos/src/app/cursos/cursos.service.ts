import { Injectable } from '@angular/core';

@Injectable()
export class CursosService {
    
  private cursos: string[] = ['Angular', 'React', 'Vue'];

  constructor() {}

  getCursos() {
    return this.cursos;
  }

  addCurso(curso: string): void {
    this.cursos.push(curso);
  }
}
