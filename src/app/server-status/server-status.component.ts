import { AfterViewInit, Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ServerStatusService } from '../../api/server-status/server-status.service';
import { IServerStatus } from '../../api/server-status/server-status.interfaces';
import { AlertsService } from '../alerts/alerts.service';

@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.component.html',
  styleUrls: ['./server-status.component.css']
})
export class ServerStatusComponent implements AfterViewInit {
  @Input() serverStatus: {version: string} = {
    version: 'App 0.0.20; '
  } as IServerStatus;

  constructor(private serverStatusService: ServerStatusService,
              private alertsService: AlertsService) {}

  ngAfterViewInit() {
    this.serverStatusService
      .get()
      .subscribe(
        serverStatus => this.serverStatus.version += `API ${serverStatus.version}`,
        (error: HttpErrorResponse) => {
          const msg = error.status === 504 || error.message === 'Bad Gateway' ?
            'API server not available' : error.statusText;
          this.alertsService.add(msg);
          this.serverStatus.version += msg;
        }
      );
  }
}
