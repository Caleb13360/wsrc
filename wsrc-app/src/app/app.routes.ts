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
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ResultDetailsComponent } from './result-details/result-details.component';
import { LoginComponent } from './login/login.component';
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
        path: 'results',
        component: RaceResultsComponent,
        title: 'Race Results'
    },
    {
        path: 'race/:id',
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
    }
];
