import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RacesComponent } from './races/races.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventsComponent } from './events_pages/events/events.component';
import { BigBlindComponent } from './events_pages/big-blind/big-blind.component';
import { WelcomeGiftComponent } from './events_pages/welcome-gift/welcome-gift.component';
import { DoubleRPComponent } from './events_pages/double-rp/double-rp.component';
import { RPRewardsComponent } from './events_pages/rpRewards/rpRewards.component';

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
        path: 'events',
        component: EventsComponent
    },
    {
        path: 'events/bigBlind',
        component: BigBlindComponent
    },
    {
        path: 'events/welcomeGift',
        component: WelcomeGiftComponent
    },
    {
        path: 'events/doubleRP',
        component: DoubleRPComponent
    },
    {
        path: 'events/RPRewards',
        component: RPRewardsComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
];
