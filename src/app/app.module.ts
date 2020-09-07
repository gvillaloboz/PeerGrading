import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' ;
import { HttpModule } from '@angular/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationService, VotingService  } from './_services/index';

import { AppComponent } from './app.component';
import { VotingTableComponent }  from './voting/voting.component';
import { LoginComponent }  from './login/login.component';

import { routing }        from './app.router';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule,
		MatRadioModule,
		MatGridListModule,
		MatTabsModule,
		MatButtonModule,
    MatInputModule
		} 
from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    VotingTableComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatGridListModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService,
    VotingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
