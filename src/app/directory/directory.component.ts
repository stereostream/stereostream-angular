import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';

import { DirectoryService } from './directory.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  dirs: IDir[];
  current_dir = '/';

  constructor(private dirService: DirectoryService) { }

  ngOnInit() {
    this.dirService
      .get(this.current_dir)
      .map(dirs =>
        dirs.filter(dir => dir.type === 'directory' || dir.name.endsWith('webm'))
      )
      .subscribe(dirs => this.dirs = dirs);
  }

  getUrl(fname: IDir) {
    return `${location.protocol}//${location.hostname}/Downloads/${fname.name}`;
  }

  followDir(fname: {name: string}, skip = false) {
    if (!skip) this.current_dir += `/${fname.name}`;
    this.dirService
      .get(this.current_dir)
      .map(dirs =>
        dirs.filter(dir => dir.type === 'directory' || dir.name.endsWith('webm'))
      )
      .subscribe(dirs => this.dirs = dirs);
  }

  upDir() {
    this.current_dir = this.current_dir.slice(0, this.current_dir.lastIndexOf('/'));
    this.followDir({ name: this.current_dir }, true);
  }
}
