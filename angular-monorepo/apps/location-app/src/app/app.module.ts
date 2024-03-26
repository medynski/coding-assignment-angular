import { EntitiesDataRepositoryModule } from '@angular-monorepo/entities/data-repository';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'entity/homepage',
  },
  {
    path: 'entity',
    children: [
      {
        path: 'homepage',
        loadComponent: () =>
          import('@angular-monorepo/entities/feature-homepage').then(
            (mod) => mod.EntitiesFeatureHomepageComponent
          ),
      },
      {
        path: 'list',
        loadComponent: () =>
          import('@angular-monorepo/entities/feature-list').then(
            (mod) => mod.EntitiesFeatureListComponent
          ),
      },

      {
        path: 'detail/:id',
        loadComponent: () =>
          import('@angular-monorepo/entities/feature-list').then(
            (mod) => mod.EntitiesFeatureListComponent
          ),
      },
    ],
  },
  {
    path: 'dashboards',
    children: [
      {
        path: 'location',
        loadComponent: () =>
          import('@angular-monorepo/entities/feature-location-dashboard').then(
            (mod) => mod.EntitiesFeatureLocationDashboardComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    AvatarGroupModule,
    AvatarModule,
    BadgeModule,
    BrowserAnimationsModule,
    BrowserModule,
    EntitiesDataRepositoryModule,
    PanelMenuModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
