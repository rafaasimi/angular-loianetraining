import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTES = [CursosListaComponent, CursosFormComponent];

const MODULES = [CommonModule, CursosRoutingModule, ReactiveFormsModule];

@NgModule({
  declarations: [COMPONENTES],
  imports: [MODULES],
})
export class CursosModule {}
