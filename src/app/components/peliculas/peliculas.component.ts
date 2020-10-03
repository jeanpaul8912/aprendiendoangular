import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})

export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: string;
  public peliculas: Array<Pelicula>;
  public favorita: Pelicula;
  public fecha:any;

  constructor(
    private _peliculaService: PeliculaService
  ) { 
    this.titulo = "Componente Peliculas";
    this.fecha = new Date(2020,8,12);
    this.peliculas = _peliculaService.getPeliculas();
  }

  ngOnDestroy(): void {
    console.log("El Componente se va a eliminar");
  }

  ngOnInit(): void {
    console.log(this.peliculas);
    console.log("Componente iniciado [ngOnInit]!");
    console.log(this._peliculaService.holaMundo());
  }

  ngDoCheck(): void {
    console.log("Componente iniciado [ngDoCheck]!");
  }

  cambiarTitulo(){
    this.titulo = "El titulo ha sido cambiado";
  }

  mostrarFavorita(event){
    this.favorita = event.pelicula;
  }
}
