import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import {AuthGuard} from './auth.guard';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(
            fromAuth.AUTH_FEATURE_KEY,
            fromAuth.reducer
        ),
    ],
    providers: [
        AuthGuard
    ]
})
export class AuthLibModule {
}
