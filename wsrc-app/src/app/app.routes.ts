import { CanActivateFn, Routes, Router, RouterStateSnapshot} from '@angular/router';
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
import { AccountCreationComponent } from './account-creation/account-creation.component';

const authGuard: CanActivateFn = async (route, state: RouterStateSnapshot) => {
    const apiService = inject(ApiService);
    const router = inject(Router);
    const intendedUrl = state.url;
    const authData = await apiService.loggedIn().toPromise();
    if (!authData.loggedIn) {
        router.navigate(['/login'], { queryParams: { redirect_uri: intendedUrl } });
        return false;
    }
    if (!authData.linked) {
        router.navigate(['/login/create'], { queryParams: { redirect_uri: intendedUrl } });
        return false;
    }
    return true;
};
const accountCreate: CanActivateFn = async () => {
    const apiService = inject(ApiService);
    const router = inject(Router);
    const currentUrl = router.url;
    const authData = await apiService.loggedIn().toPromise();
    if (!authData.loggedIn) {
        router.navigate(['/login'], { queryParams: { redirect_uri: currentUrl } });
        return false;
    }
    if (authData.linked) {
        router.navigate(['/']);
        return false;
    }
    return true;
};
const loginReady: CanActivateFn = async () => {
    const apiService = inject(ApiService);
    const router = inject(Router);
    const currentUrl = router.url;
    const authData = await apiService.loggedIn().toPromise();
    if (authData.loggedIn) {
        if (authData.linked) {
            router.navigate(['/']);
            return false;
        }
        router.navigate(['/login/create'], { queryParams: { redirect_uri: currentUrl } });
        return false;
    }
    return true;
};

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
        path: 'result/:id',
        component: ResultDetailsComponent,
        title: 'Result Details'
    },
    { 
        path: 'login',
        component: LoginComponent,
        title: 'Login',
        canActivate: [loginReady]
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
        path: 'login/create',
        component: AccountCreationComponent,
        title:'Account Creation',
        canActivate: [accountCreate]
    }
];
