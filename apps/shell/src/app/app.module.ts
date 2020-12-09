import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {APP_ROUTES} from './app.routes';
import {HomeComponent} from './home/home.component';
import {AuthStoreModule} from './store/auth-store.module';
import {AppEffects} from './app.effects';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(APP_ROUTES),
        StoreModule.forRoot({
            router: routerReducer,
        }),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([AppEffects]),
        !environment.production ? StoreDevtoolsModule.instrument({maxAge: 25}) : [],
        // Local modules
        AuthStoreModule,
    ],
    providers: [
    ]
})
export class AppModule {
}
