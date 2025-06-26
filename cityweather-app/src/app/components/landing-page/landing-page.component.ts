import { Component, signal, effect } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(public auth: AuthService) { }
  isAuthenticated = false;
  isUserLoggedIn = signal<boolean>(false);

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(loggedIn => {
      this.isAuthenticated = loggedIn;
      this.isUserLoggedIn.set(loggedIn);
    });

  
      console.log(`The user is: ${this.isUserLoggedIn()}`);
  
  }

  login() {
    this.auth.loginWithRedirect({
      appState: { target: '/home' }
    });
  }

}


