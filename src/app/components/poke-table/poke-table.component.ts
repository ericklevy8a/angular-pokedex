import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  displayedColumns: string[] = ['id', 'name', 'image', 'type'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    let pokemonData = {};

    for (let i = 1; i <= 898; i++) {
      this.pokemonService.getPokemon(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            id: res.id,
            name: res.name,
            image: res.sprites.front_default,
            type: res.types[0].type.name
          };
          this.data.push(pokemonData);

          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;

        },
        err => {
          console.log(err);
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any) {
    this.router.navigateByUrl(`/detail/${row.position}`);
  }

}
