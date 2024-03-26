import { Component } from '@angular/core';

@Component({
  selector: 'angular-monorepo-root',
  template: ` <div class="app-container">
    <div class="header">
      <h2 routerLink="/">Great Location App</h2>
      <div>
        <p-avatar
          label="KO"
          pBadge
          styleClass="mr-5"
          value="4"
          [style]="{ 'background-color': '#4caf4f', color: '#ffffff' }"
        ></p-avatar>
      </div>
    </div>
    <div class="main-container">
      <div class="menu-container">
        <p-panelMenu [model]="items"></p-panelMenu>
      </div>
      <div>
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>`,
})
export class AppComponent {
  title = 'location-app';

  items = [
    {
      label: 'Entities',
      icon: 'pi pi-fw pi-compass',
      items: [
        {
          label: 'Homepage',
          icon: 'pi pi-fw pi-bookmark',
          routerLink: 'entity/homepage',
        },
        {
          label: 'List',
          icon: 'pi pi-fw pi-list',
          routerLink: 'entity/list',
        },
      ],
    },
    {
      label: 'Dashboards',
      icon: 'pi pi-fw pi-chart-bar',
      items: [
        {
          label: 'Location Dashboard',
          icon: 'pi pi-fw pi-chart-line',
          routerLink: 'dashboards/location',
        },
      ],
    },
  ];
}
