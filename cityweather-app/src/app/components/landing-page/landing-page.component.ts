import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(public auth: AuthService) { }

  login() {
    this.auth.loginWithRedirect({
      appState: { target: '/home' }
    });
  }

}


