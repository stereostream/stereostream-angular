import { Component } from '@angular/core';
import { AuthService } from '../../api/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedIn = AuthService.loggedIn;
  logout = AuthService.logout;

  constructor() { }
}
