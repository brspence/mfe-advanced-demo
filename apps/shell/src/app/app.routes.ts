import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { AuthGuard } from '@demo/auth-lib';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
    },
    {
        path: 'login',
        // Lazy loaded local module
        loadChildren: () =>
            import('./login/login-route.module').then(
                (m) => m.LoginRouteModule
            ),
    },
    {
        path: 'counter',
        canActivate: [AuthGuard],
        loadChildren: () =>
            loadRemoteModule({
                // type: 'module',
                remoteName: 'counter',
                remoteEntry: environment.counterRemoteEntryUrl,
                exposedModule: './Module',
            }).then((m) => m.CounterRouteModule),
    },
];
