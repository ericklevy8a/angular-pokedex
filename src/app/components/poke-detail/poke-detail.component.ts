import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  image = '';

  constructor(private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);
      }
    )
  }

  ngOnInit(): void {
  }

  getPokemon(id: any) {
    this.pokemonService.getPokemon(id).subscribe(
      res => {
        console.log(res);
        this.pokemon = res;
        this.image = this.pokemon.sprites.front_default;
      },
      err => {
        console.log(err);
      }
    )
  }

}

