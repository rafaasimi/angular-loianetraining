import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any> = new Observable();
  total = 0;
  readonly fields = 'name,description,version,homepage';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(300),
      distinctUntilChanged(),
      // tap(console.log),
      switchMap(value => this.http.get(this.SEARCH_URL, {
        params: {
          search: value,
          fields: this.fields
        }
      })),
      tap((response: any) => this.total = response.total),
      map((response: any) => response.results)
    );
  }

  onSearch() {
    let fields = 'name,description,version,homepage';
    let value = this.queryField.value;

    if (value && (value = value.trim()) !== '') {
      
      // Forma 1 - Criando um objeto com os parametros
      const params2 = {
        search: value,
        fields: fields
      }

      // Forma 2 - Utilizando o próprio HttpParams para setar os valores
      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields)

      this.results$ = this.http
        // Forma 3 - Concatenando os valores e propriedades
        // .get<any>(
        //   this.SEARCH_URL +
        //     `?fields=${fields}&search=${value}`
        // )
        .get<any>(this.SEARCH_URL, { params })
        .pipe(
          tap((response) => (this.total = response.total)),
          map((response) => response.results)
        );
    }
  }
}
