import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { TAlert } from './alerts.types';

@Injectable()
export class AlertsService {
  alerts: string[] = [];

  constructor(private snackBar: MatSnackBar) {
    // this.alerts = [];
  }

  public add(alert: string | TAlert | Error, action?: string | false, config?: MatSnackBarConfig): void {
    const alert_s = alert && (typeof alert === 'string' ? alert
      : (alert instanceof Error ? alert.message : Object
        .keys(alert)
        .map(k => alert[k])
        .join('\t'))) || 'undefined alert';

    this.alerts.push(alert_s);
    // console.warn('AlertsService::alerts =', this.alerts, ';');
    this.snackBar.open(
      alert_s,
      !action && typeof action !== 'boolean' ? 'Close' : action as string,
      config
    );
  }
}
