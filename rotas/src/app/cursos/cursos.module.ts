import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';

import { CursosService } from './cursos.service';
import { CursosRoutingModule } from './cursos-routing.module';

const MODULES = [
  CommonModule,
  CursosRoutingModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatTableModule,
]

const COMPONENTS = [
  CursosComponent,
  CursoDetalheComponent,
  CursoNaoEncontradoComponent
]

const SERVICES = [CursosService]

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS],
  providers: [SERVICES]
})

export class CursosModule { }
