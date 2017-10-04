import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AlertsService } from '../../app/alerts/alerts.service';
import { IRoom } from './room.interfaces';

@Injectable()
export class RoomService {
  constructor(private http: HttpClient,
              private alertsService: AlertsService) { }

  getAll(): Observable<{rooms: IRoom[]}> {
    return this.http
      .get<{rooms: IRoom[]}>('/api/room')
      .catch((err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404)
            this.alertsService.add('No rooms; add one!');
          return Observable.of({ rooms: null });
        }
        return Observable.throw(err);
      });
  }

  get(name: string): Observable<IRoom> {
    return this.http
      .get<IRoom>(`/api/room/${name}`)
      .map((room: IRoom) =>
        Object.assign(room, {
          log: room.log == null || !room.log ? null : room.log.map(log => Object.assign(log, { date: moment(new Date(log.date as any)) }))
        }));
  }

  set(name: string): Observable<IRoom> {
    return this.http.post<IRoom>(`/api/room/${name}`, null);
  }

  del(name: string): Observable<IRoom> {
    return this.http.delete<IRoom>(`/api/room/${name}`);
  }
}
