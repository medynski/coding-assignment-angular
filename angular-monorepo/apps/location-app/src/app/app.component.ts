import { Component } from '@angular/core';

@Component({
  selector: 'angular-monorepo-root',
  template: ` <div class="flex flex-col h-screen">
    <div class="flex justify-between items-center bg-slate-400 p-4">
      <h2 routerLink="/" class="cursor-pointer font-bold">
        Great Location App
      </h2>
      <div class="relative">
        <img
          class="w-10 h-10 rounded"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt=""
        />
        <span
          class="absolute top-0 left-8 transform -translate-y-1/2 w-3.5 h-3.5 bg-red-400 border-2 border-slate-400 rounded-full"
        ></span>
      </div>
    </div>
    <div class="lg:flex h-full">
      <div class="lg:mr-2.5">
        <p-panelMenu [model]="items"></p-panelMenu>
      </div>
      <div class="p-5">
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
