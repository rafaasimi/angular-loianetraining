import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AlunosComponent } from './alunos.component';
import { AlunoFormularioComponent } from './aluno-formulario/aluno-formulario.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosService } from './alunos.service';

const COMPONENTS = [
  AlunosComponent,
  AlunoFormularioComponent,
  AlunoDetalheComponent,
];

const MODULES = [
  CommonModule,
  AlunosRoutingModule,
  MatTableModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  MatButtonModule,
];

const SERVICES = [AlunosService];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS],
  providers: [SERVICES],
})
export class AlunosModule {}
