import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RacesComponent } from './races/races.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RaceResultsComponent } from './race-results/race-results.component';
import { RaceDetailsComponent } from './race-details/race-details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'races',
        component: RacesComponent,
        title: 'Races'
    },
    {
        path: 'about',
        component: AboutUsComponent,
        title: 'About Us'
    },
    {
        path: 'results',
        component: RaceResultsComponent,
        title: 'Race Results'
    },
    {
        path: 'details',
        component: RaceDetailsComponent,
        title: 'Race Details'
    }
];
