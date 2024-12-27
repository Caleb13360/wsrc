import { CanActivateFn, Routes, Router} from '@angular/router';
import { inject } from '@angular/core';
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
import { ApiService } from '../services/api';

const authGuard: CanActivateFn = async () => {
    const apiService = inject(ApiService);
    const router = inject(Router);
    const isLoggedIn = await apiService.loggedIn().toPromise().then((data) => data.loggedIn);

    if (!isLoggedIn) {
        router.navigate(['/login']);
        return false;
    }
    return true;
};

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
        canActivate: [authGuard]
    },
    {
        path: 'races',
        component: RacesComponent,
        title: 'Races',
        canActivate: [authGuard]
    },
    {
        path: 'about',
        component: AboutUsComponent,
        title: 'About Us'
    },
    {
        path: 'results',
        component: RaceResultsComponent,
        title: 'Race Results',
        canActivate: [authGuard]
    },
    {
        path: 'race/:id',
        component: RaceDetailsComponent,
        title: 'Race Details',
        canActivate: [authGuard]
    },
    { 
        path: 'profile',
        component: UserProfileComponent,
        title: 'Profile',
        canActivate: [authGuard]
    },
    {
        path: 'wallet',
        component: WalletComponent,
        title: 'Wallet',
        canActivate: [authGuard]
    },
    { 
        path: 'notifications',
        component: NotificationsComponent,
        title: 'Notifications',
        canActivate: [authGuard]
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
        title: 'Checkout',
        canActivate: [authGuard]
    },
    {
        path: 'withdraw',
        component: WithdrawComponent,
        title: 'Withdraw',
        canActivate: [authGuard]
    },
    { 
        path: 'result-details',
        component: ResultDetailsComponent,
        title: 'Result Details',
        canActivate: [authGuard]
    },
    { 
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'events',
        component: EventsComponent,
        canActivate: [authGuard]
    }, 
    {
        path: 'events/bigBlind',
        component: BigBlindComponent,
        canActivate: [authGuard]
    },
    {
        path: 'events/welcomeGift',
        component: WelcomeGiftComponent,
        canActivate: [authGuard]
    },
    {
        path: 'events/doubleRP',
        component: DoubleRPComponent,
        canActivate: [authGuard]
    },
     { 
        path: 'events/RPRewards',
        component: RPRewardsComponent,
        canActivate: [authGuard]
    }
];
