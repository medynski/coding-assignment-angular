import {
  EmployeeVisits,
  EntityService,
  handleError,
  LocationStats,
  Nullable,
} from '@angular-monorepo/entities/data-repository';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

@Component({
  selector: 'angular-monorepo-entities-feature-location-dashboard',
  template: `<main>
    @if (stats()) {
      <div class="flex  w-full flex-col lg:w-10/12 lg:flex-row">
        <div class="w-full lg:w-1/2">
          <div class="lg:scale-75">
            <highcharts-chart
              [Highcharts]="Highcharts"
              [options]="occupancyChartOptions"
              [oneToOne]="true"
            >
            </highcharts-chart>
          </div>
        </div>
        <div class="w-full lg:w-1/2">
          <div class="lg:scale-75">
            <highcharts-chart
              [Highcharts]="Highcharts"
              [options]="visitsChartOptions"
              [oneToOne]="true"
            >
            </highcharts-chart>
          </div>
        </div>
      </div>
    }
  </main>`,
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesFeatureLocationDashboardComponent {
  private readonly entityService = inject(EntityService);

  readonly Highcharts: typeof Highcharts = Highcharts;
  occupancyChartOptions: Highcharts.Options = {};
  visitsChartOptions: Highcharts.Options = {};

  readonly stats = toSignal<Nullable<LocationStats>>(
    this.entityService
      .getLocationStats()
      .pipe(handleError<Nullable<LocationStats>>(null)),
  );

  constructor() {
    effect(() => {
      const stats = this.stats();
      if (stats) {
        this.setupOccupancyChart(stats.lastWeekLocationOccupancy);
        this.setupVisitsChart(stats.lastWeekEmployeesVisits);
      }
    });
  }

  private setupOccupancyChart(data: number[]) {
    this.occupancyChartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Location Occupancy (Last Week)',
      },
      yAxis: {
        title: {
          text: null,
        },
      },
      xAxis: {
        labels: {
          formatter: (e) => WEEKDAYS[e.value as number],
        },
      },
      series: [
        {
          data,
          name: 'Occupancy',
        } as Highcharts.SeriesOptionsType,
      ],
    };
  }

  setupVisitsChart(data: EmployeeVisits[]): void {
    this.visitsChartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Top 5 Employee Visits (Last Week)',
      },
      xAxis: {
        categories: data.map((e) => e.name),
      },
      yAxis: {
        title: {
          text: null,
        },
      },
      series: [
        {
          data: data.map((e) => e.visits),
          name: 'Visits',
        } as Highcharts.SeriesOptionsType,
      ],
    };
  }
}
