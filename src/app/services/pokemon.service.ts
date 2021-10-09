import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number = 0, limit: number = 20) {
    return this.http.get<any>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemon(index: any) {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }

}
