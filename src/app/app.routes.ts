import { Routes } from '@angular/router';
import { MovieList } from './components/movie-list/movie-list';
import { Wishlist } from './components/wish-list/wish-list';
import { MovieDetail } from './components/movie-detail/movie-detail';

export const routes: Routes = [
  { path: '', component: MovieList },
  { path: 'wishlist', component: Wishlist },
  { path: ':id', component: MovieDetail },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];