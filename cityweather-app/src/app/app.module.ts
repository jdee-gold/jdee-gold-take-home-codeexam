import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './components/weather/weather.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    WeatherComponent,
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     AuthModule.forRoot({
      domain: 'dev-mzwnd73iwlfhlixh.us.auth0.com',
      clientId: '5JWHYTX1VNnSGBaOTijB6aMDacncLtEG',
      authorizationParams: {
        redirect_uri: window.location.origin,
        connection: 'github'
      }
    }),
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCommonModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
