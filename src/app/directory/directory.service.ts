import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DirectoryService {
  constructor(private httpClient: HttpClient) { }

  get(path = '/'): Observable<IDir[]> {
    return this.httpClient.get<IDir[]>(`/Downloads${!path || path === '/' ? '' : path }`)
      .map(l => l.map(o => Object.assign(o, { date: new Date(o.mtime) })));
  }
}
