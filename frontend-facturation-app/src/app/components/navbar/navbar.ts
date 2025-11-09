import {Component, OnInit, signal} from '@angular/core';
import {KeycloakProfile} from 'keycloak-js';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
  profile?:KeycloakProfile;
  protected readonly title = signal('customer-front-angular-app');
  constructor(public keycloak: KeycloakService) {
  }
  ngOnInit() {
    if (this.keycloak.isLoggedIn()){
      this.keycloak.loadUserProfile().then(profile =>{
        this.profile = profile;
        console.log("The user authenticated => ", this.profile);
      })
    }
  }

  logout() {
    this.keycloak.logout();
  }

  async login() {
    await this.keycloak.login({
      redirectUri: window.location.origin
    });
  }
}
