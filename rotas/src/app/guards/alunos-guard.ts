import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlunosGuard implements CanActivateChild {
  constructor() {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // console.log(childRoute)
    // console.log(state)

    if(state.url.includes('editar')) {
        // alert('Usuário não possuí permissões de edição.')
        // return false;
    }

    return true;
  }
}
