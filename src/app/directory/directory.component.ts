import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';

import { DirectoryService } from './directory.service';

const filt = dir => dir.type === 'directory' || dir.name.endsWith('webm');

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  dirs: IDir[];
  current_dir = '/';
  base = `${location.protocol}//${location.hostname}${location.port === '80' ? '' : ':' + location.port}`;

  constructor(private dirService: DirectoryService) { }

  ngOnInit() {
    this.dirService
      .get(this.current_dir)
      .map(dirs => dirs.filter(filt))
      .subscribe(dirs => this.dirs = dirs);
  }

  getUrl(fname: IDir) {
    return new URL(`${this.dirService.base_path}/${fname.name}`, this.base);
  }

  followDir(fname: {name: string}, skip = false) {
    if (!skip) this.current_dir += `${this.current_dir.endsWith('/') ? '' : '/'}${fname.name}/`;
    this.dirService
      .get(this.current_dir)
      .map(dirs => dirs.filter(filt))
      .subscribe(dirs => this.dirs = dirs);
  }

  upDir() {
    this.current_dir = this.current_dir.slice(0, this.current_dir.lastIndexOf('/', this.current_dir.lastIndexOf('/') - 1));
    this.followDir({ name: this.current_dir }, true);
  }
}
