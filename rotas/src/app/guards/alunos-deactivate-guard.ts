import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { AlunoFormularioComponent } from "../alunos/aluno-formulario/aluno-formulario.component";

@Injectable()
export class AlunosDeativateGuard  implements CanDeactivate<AlunoFormularioComponent> {

  canDeactivate(
    component: AlunoFormularioComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    console.log('Caí no canDeactivate')

    return component.podeMudarRota();
  }
}  