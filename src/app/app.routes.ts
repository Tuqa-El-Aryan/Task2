import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'user-details/:id', component: UserDetailsComponent },
    { path: '**', component: ErrorPageComponent },
];
