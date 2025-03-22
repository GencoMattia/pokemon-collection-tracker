import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, forkJoin, Observable, concatAll } from 'rxjs';

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

interface Pokemon {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonPage(limit: number, offset: number): Observable<Pokemon[]> {
    const url = `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`;
    return this.http.get<PokemonListResponse>(url).pipe(
      map(response => response.results.map(pokemon => this.getPokemonDetails(pokemon.url))),
      map(pokemonDetailsRequests => forkJoin(pokemonDetailsRequests)),
      concatAll()
    );
  }

  private getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<any>(url).pipe(
      map(pokemon => ({ id: pokemon.id, name: pokemon.name }))
    );
  }
}
