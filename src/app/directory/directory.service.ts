import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class DirectoryService {
  base_path = '/Downloads';
  headers = new Headers();

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }

  get(path = '/'): Observable<IDir[]> {
    return this.http
      .get(path === this.base_path ? path : `${this.base_path}${!path ? '/' : path}`,
        new RequestOptions({ headers: this.headers })
      )
      .map(dirs => dirs.json()
        .map(dir => Object.assign(dir, { date: moment(dir.mtime as any as string).toDate() }))
        .sort((a, b) => moment.utc(a.mtime).diff(moment.utc(b.mtime)))
      );
  }
}
