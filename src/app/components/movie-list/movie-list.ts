
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [],
  styleUrl: './movie-list.css',
  templateUrl: './movie-list.html',
})
export class MovieList implements OnInit {

  router = inject(Router);
  movieService = inject(MovieService);

  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    console.time('Chargement des films');

    this.movieService.getMovieList().subscribe({
      next: (response) => {
        this.movieService.movieList.set(response);
        console.log('Films récupérés :', response);
      },
      error: (error) => {
        console.error('Erreur lors du chargement :', error);
        this.errorMessage.set('Impossible de charger les films.');
        this.isLoading.set(false);
        console.timeEnd('Chargement des films');
      },
      complete: () => {
        this.isLoading.set(false);
        console.timeEnd('Chargement des films');
      }
    });
  }

  navigateTo(movie: Movie) {
    this.router.navigate(['/', movie.id]);
  }
}
