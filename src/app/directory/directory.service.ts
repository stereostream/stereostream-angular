import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

@Injectable()
export class DirectoryService {
  constructor(private httpClient: HttpClient) { }

  get(path = '/'): Observable<IDir[]> {
    return this.httpClient
      .get<IDir[]>(`/Downloads${!path || path === '/' ? '' : (path[0] === '/' ? path : '/' + path) }`)
      .map(dirs => dirs
        .map(dir => Object.assign(dir, { date: moment(dir.mtime as any as string).toDate() }))
        .sort((a, b) => moment.utc(a.mtime).diff(moment.utc(b.mtime)))
      );
  }
}
