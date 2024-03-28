import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'angular-monorepo-entities-feature-location-dashboard',
  template: '<div>entities feature location dashboard</div>',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesFeatureLocationDashboardComponent {}
