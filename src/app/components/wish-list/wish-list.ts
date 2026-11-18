import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie-service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css',
})
export class Wishlist {
  movieService = inject(MovieService);
}