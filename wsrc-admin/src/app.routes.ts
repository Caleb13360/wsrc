import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from './app/pages/login/login';
import { Races } from './app/pages/races/races';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Races },
            { path: 'races', component: Races },
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'login', component: Login },
    { path: '**', redirectTo: '/notfound' }
];
