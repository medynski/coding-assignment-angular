import { Component } from '@angular/core';

@Component({
  selector: 'angular-monorepo-root',
  template: ` <div class="container mx-auto flex flex-col h-screen">
    <div class="flex justify-between items-center bg-slate-400 p-4">
      <h2 routerLink="/" class="cursor-pointer font-bold">
        Great Location App
      </h2>
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
    <div class="flex h-full">
      <div class="bg-blue-100">
        <p-panelMenu [model]="items"></p-panelMenu>
      </div>
      <div class="p-2.5">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>`,
})
export class AppComponent {
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
