import * as moment from 'moment';

export interface IRoom {
  name: string;
  owner: string;
  log: ILogEntry[];
}

export interface ILogEntry {
  date: moment.Moment
  /* | string */
  ;
  user: string;
  content: string;
}
