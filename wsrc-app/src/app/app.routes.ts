import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RacesComponent } from './races/races.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RaceResultsComponent } from './race-results/race-results.component';
import { RaceDetailsComponent } from './race-details/race-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ResultDetailsComponent } from './result-details/result-details.component';
import { LoginComponent } from './login/login.component';


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
    },
    { 
        path: 'profile',
        component: UserProfileComponent,
        title: 'Profile'
    },
    { 
        path: 'withdraw',
        component: WithdrawComponent,
        title: 'Withdraw'
    },
    { 
        path: 'result-details',
        component: ResultDetailsComponent,
        title: 'Result Details'
    },
    { 
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    }
];
