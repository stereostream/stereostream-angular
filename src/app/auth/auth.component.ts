import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../api/auth/auth.service';
import { IAuthReq, ILoginResp } from '../../api/auth/auth.interfaces';
import { AlertsService } from '../alerts/alerts.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, AfterViewInit {
  auth = new FormControl();
  loggedIn = AuthService.loggedIn;
  form: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private alertsService: AlertsService) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    if (AuthService.loggedIn())
      this.router
        .navigate(['/rooms'])
        .then(() => {});
  }

  signInUp() {
    this.authService
      .signinup({
        email: this.form.value.username,
        password: this.form.value.password
      })
      .subscribe((_user: IAuthReq | ILoginResp) => {
          if (_user.hasOwnProperty('access_token')) {
            this.authService._login(_user as ILoginResp);
            this.router
              .navigate(['/rooms'])
              .then(() => {});
          } else this.alertsService.add(`Unexpected: ${JSON.stringify(_user)};`);
        }
      );
  }
}
