import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VotingTableComponent } from './voting/voting.component';


export const router : Routes = [
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'voting', component: VotingTableComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(router);