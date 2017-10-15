import { Injectable } from '@angular/core';

@Injectable()
export class WebrtcService {
  recorded: Array<{download: string, href: string}> = [];

  constructor() {}
}
