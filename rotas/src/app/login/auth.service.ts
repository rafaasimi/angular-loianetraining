import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  fazerLogin(usuario: Usuario) {
    if (
      usuario.nome === 'rafael@hotmail.com' &&
      usuario.senha === '123456'
    ) {
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(this.usuarioAutenticado)
      this.router.navigate(['/']);
    } else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(this.usuarioAutenticado)
    }
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
