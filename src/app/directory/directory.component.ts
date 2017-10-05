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

  constructor(private dirService: DirectoryService) { }

  ngOnInit() {
    this.dirService
      .get()
      .map(dirs => dirs.filter(
        dir => dir.type === 'directory' || dir.name.endsWith('webm')
      ))
      .subscribe(
        dirs => this.dirs = dirs
      );
  }

  getUrl(fname: IDir) {
    return `${location.protocol}//${location.hostname}/Downloads/${fname.name}`;
  }
}
