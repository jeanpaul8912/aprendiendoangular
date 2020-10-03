import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable()
export class PeliculaService {

    private peliculas: Pelicula[];

    constructor(){
        this.peliculas = [
            new Pelicula("Spiderman 4",2019,'https://cnet1.cbsistatic.com/img/rfzZ-7G32v_qEt2uCD0b4KB2rho=/940x0/2019/03/26/13d0a566-7355-4381-be24-dee281227504/spider-man-far-from-home-promo-image-1.jpg'),      
            new Pelicula("Los vengadores Endgame",2020,"https://esports.as.com/2019/04/26/bonus/cine--series-y-anime/Vengadores-Endgame_1239786034_195960_1440x810.jpg"),      
            new Pelicula("Batman vs Superman",2015, "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/08/batman-vs-superman.jpg"),
            new Pelicula("Batman vs Superman 2",2011,"https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/08/batman-vs-superman.jpg")
          ];
    }
    
    holaMundo(){
        return 'Hola Mundo desde servicio de angular';
    }

    getPeliculas(){
        return this.peliculas; 
    }
}