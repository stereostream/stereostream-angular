import { Routes } from '@angular/router';

import { RoomComponent } from './room.component';

export const roomRoutes: Routes = [
  { path: 'room/:name', component: RoomComponent }
];
