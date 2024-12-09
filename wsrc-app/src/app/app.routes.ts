import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RacesComponent } from './races/races.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RaceResultsComponent } from './race-results/race-results.component';
import { RaceDetailsComponent } from './race-details/race-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WalletComponent } from './wallet/wallet.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CheckoutComponent } from './checkout/checkout.component';


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
        path: 'wallet',
        component: WalletComponent,
        title: 'Wallet'
    },
    { 
        path: 'notifications',
        component: NotificationsComponent,
        title: 'Notifications'
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
        title: 'Checkout'
    }
];
