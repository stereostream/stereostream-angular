import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from '../../api/auth/auth.service';
import { ServerStatusService } from '../../api/server-status/server-status.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertsService } from '../alerts/alerts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  loggedIn = AuthService.loggedIn;
  logout = AuthService.logout;
  title: string;

  constructor(private serverStatusService: ServerStatusService,
              private alertsService: AlertsService) { }

  ngAfterViewInit() {
    const dictate = 'network not connected; reconnect and stop->run';
    this.serverStatusService
      .get()
      .subscribe(
        serverStatus => {
          if (typeof serverStatus.private_ip === 'undefined') {
            this.title = dictate;
            this.alertsService.add(dictate);
          } else this.title = serverStatus.private_ip;
        },
        (error: HttpErrorResponse) => {
          this.title = dictate;
          console.error(error);
        }
      );
  }
}
