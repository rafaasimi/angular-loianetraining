import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosComponent } from './alunos.component';
import { AlunoFormularioComponent } from './aluno-formulario/aluno-formulario.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';

import { AlunosRoutingModule } from './alunos-routing.module';

const COMPONENTS = [
  AlunosComponent,
  AlunoFormularioComponent,
  AlunoDetalheComponent,
];

const MODULES = [CommonModule, AlunosRoutingModule];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS],
})
export class AlunosModule {}
