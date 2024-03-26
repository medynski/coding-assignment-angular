import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { EntitiesFeatureHomepageModule } from '@angular-monorepo/entities/feature-homepage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AvatarModule,
    PanelMenuModule,
    BadgeModule,
    AvatarGroupModule,
    EntitiesFeatureHomepageModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
