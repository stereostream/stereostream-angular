import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';

import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { MaterialImportModule } from './material-import/material-import.module';
import { appRoutes } from './app.routes';
import { AuthGuard } from './auth/auth.guard';
import { FooterModule } from './footer/footer.module';
import { AlertsService } from './alerts/alerts.service';
import { AuthService } from '../api/auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptors';
import { RoomsModule } from './rooms/rooms.module';
import { RoomModule } from './room/room.module';
import { DirectoryModule } from './directory/directory.module';
import { AuthModule } from './auth/auth.module';
import { AdvertModule } from './advert/advert.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
    RouterModule, RouterModule.forRoot(appRoutes),

    FlexLayoutModule, ObserversModule, PlatformModule,

    // RepeatModule,
    MaterialImportModule,
    AuthModule,
    NavbarModule,
    FooterModule,
    AdvertModule,
    DirectoryModule,
    RoomsModule,
    RoomModule
  ],
  providers: [
    AlertsService, AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
