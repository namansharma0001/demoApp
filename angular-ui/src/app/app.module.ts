import { NgModule } from '@angular/core';
import { AngularTokenService,AngularTokenModule } from 'angular-token';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogicComponent } from './logic/logic.component';

import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AgmCoreModule } from '@agm/core';

  import {
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatListModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTabsModule,
    MatRadioModule,
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
  } from '@angular/material';




import {environment} from "../environments/environment";







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    LogicComponent

  ],
  imports: [
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule, 
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatListModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTabsModule,
    MatRadioModule,
    AngularTokenModule.forRoot({
      apiBase: 'http://localhost:3000',
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAZ6dyv1rOhdaJzzlrZnuO925iRcr-NMYU',
      // libraries: ['places']
    })
  ],
  providers: [ AngularTokenModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
