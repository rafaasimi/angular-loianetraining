import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface IFormCanDeactivate {
  podeDesativar(): any;
}

@Injectable()
export class AlunosDeativateGuard  implements CanDeactivate<IFormCanDeactivate> {

  canDeactivate(
    component: IFormCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    console.log('Caí no canDeactivate')

    return component.podeDesativar();
  }
}  