import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { CommonModule } from '@angular/common';

interface Pokemon {
  id: number;
  name: string;
  caught: boolean;
}

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-table.component.html',
  styleUrl: './pokemon-table.component.sass'
})
export default class PokemonTableComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  limit: number = 20;
  offset: number = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.pokemonService.getPokemonPage(this.limit, this.offset).subscribe({
      next: pokemon => {
        this.pokemonList = pokemon;
        console.log(this.pokemonList);
      },
      error: error => {
        console.error('There was an error!', error);
        // Display an error message to the user
      }
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

  toggleCaught(pokemon: Pokemon): void {
    pokemon.caught = !pokemon.caught;
    console.log(`${pokemon.name} caught status: ${pokemon.caught}`);
    // Qui dovresti salvare le modifiche (ad esempio, in localStorage)
  }
}
