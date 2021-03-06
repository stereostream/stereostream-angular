import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  { path: '', loadChildren: 'app/home/home.module#HomeModule' },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'rooms', loadChildren: 'app/rooms/rooms.module#RoomsModule', canActivate: [AuthGuard] },
  { path: 'room', loadChildren: 'app/room/room.module#RoomModule', canActivate: [AuthGuard] },
  { path: 'directory', loadChildren: 'app/directory/directory.module#DirectoryModule' }
];
