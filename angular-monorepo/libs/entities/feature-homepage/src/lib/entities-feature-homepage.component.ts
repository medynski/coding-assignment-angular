import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'angular-monorepo-entities-feature-homepage',
  template: `<main>
    <h2 class="font-bold">Hi everyone!</h2>

    <p class="py-2.5">I wish to have a bit more time to prepare a perfect solution for this development problem, but due to the end of the month and my daily duties related to my current employer, I couldn't organize my schedule and find some more time to make a better impression.<p>
    <p class="py-2.5">On the list below I'm presenting a part of the things that I've taken care of within this implementation:</p>
    <ul class="list-disc ml-10">
      <li>Dependencies are up-to-date, "found 0 vulnerabilities" as and outcome from "npm audit", the newest angular/nx is on the board</li>
      <li>Web accessibility is in good shape (aria-attr implemented, semantic HTML used, contrast ratio is fine)</li>
      <li>Implemented a consistent styling approach by using tailwind css</li>
    </ul>

    <p class="py-2.5">Future consideration:</p>
    <ul class="list-disc ml-10">
      <li>Cover the code by automated tests</li>
      <li>Prepare a global interceptor and handler for API requests (at least to manage loading state)</li>
      <li>Document components in storybook</li>
      <li>Take care about lighthouse vitals</li>
      <li>Implements PWA functionalities to improve web performance (manifest.json, ServiceWorker, offline mode, caching strategy)<li>
      <li>Improve user experience by implementing deferred views instead of lazy loading the entire route component</li>
    </ul>

    </main>`,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesFeatureHomepageComponent {}
