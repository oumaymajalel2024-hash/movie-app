import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { withPreloading } from '../../../node_modules/@angular/router/types/router';
import { Observable, pipe } from '../../../node_modules/rxjs/dist/types/index';
import { environment } from '../../environments/environment';
import { Movie } from '../interfaces/movie';
import { MovieResponse } from '../interfaces/movie-response';
import { signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.url_api;
  private readonly key = environment.api_key;
  private readonly movieURL = environment.url_movie_api;
  public movieList=signal<Movie[]>([]);
  public selectedMovie=signal<Movie | null>(null);
  public wishList=signal<Movie[]>([]);
  getMovieList(): Observable<Movie[]> {
    return this.http
      .get<MovieResponse>(`${this.url}?api_key=${this.key}`)
      .pipe(map((response) => response.results));
  }
  getMovieById(id: number){
    return this.http.get<Movie>(`${this.movieURL}/${id}?api_key=${this.key}`).pipe(
      map((response) => response)
    );
  }
  addToWishList(movie: Movie) {
    this.wishList.update((wishList) => [...wishList, movie])
    localStorage.setItem('wishList', JSON.stringify(this.wishList()));
  }
}


