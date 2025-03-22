import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-table.component.html',
  styleUrl: './pokemon-table.component.sass'
})
export default class PokemonTableComponent implements OnInit {
  pokemonList: any[] = [];
  limit: number = 20;
  offset: number = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.pokemonService.getPokemonPage(this.limit, this.offset).subscribe(pokemon => {
      this.pokemonList = pokemon;
      console.log(this.pokemonList);
    });
  }

  nextPage(): void {
    this.offset += this.limit;
    this.loadPokemon();
  }

  previousPage(): void {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemon();
    }
  }
}
