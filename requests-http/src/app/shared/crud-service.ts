import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";

interface IRegistro {
    id: number | null;
}

export class CrudService<T extends IRegistro> {

  constructor(public http: HttpClient, private API_URL: string) {}

  list() {
    return this.http.get<T[]>(this.API_URL).pipe(delay(500), tap(console.log));
  }

  loadByID(id: string | number) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(registro: T) {
    return this.http.post(this.API_URL, registro).pipe(take(1));
  }

  private update(registro: T) {
    return this.http.put(`${this.API_URL}/${registro.id}`, registro).pipe(take(1));
  }

  save(registro: T) {
    if (registro['id']) {
      return this.update(registro);
    } else {
      return this.create(registro);
    }
  }

  remove(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }

}
