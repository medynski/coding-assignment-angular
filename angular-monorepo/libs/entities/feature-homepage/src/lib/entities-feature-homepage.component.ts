import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'angular-monorepo-entities-feature-homepage',
  template: `<main class="text-gray-700">
    <h2 class="font-bold mb-5">Hi everyone!</h2>

    <p class="mb-3">
      I wish to have a bit more time to prepare a perfect solution for this
      development problem, but due to the end of the month and my daily duties
      related to my current employer, I couldn't organize my schedule and find
      some more time to make a better impression.
    </p>
    <p></p>
    <p class="mb-3">
      On the list below I'm presenting a part of the things that I've taken care
      of within this implementation:
    </p>
    <ul class="list-disc ml-10">
      <li>
        Dependencies are up-to-date, "found 0 vulnerabilities" as and outcome
        from "npm audit", the newest angular/nx is on the board
      </li>
      <li>Implemented a consistent styling approach by using tailwind css</li>
      <li>
        The application is built on top of cutting-edge functionalities from the
        newest angular version (NOTICE: Of course, I know how to write the code
        based on older ng versions - you can find some samples in my
        <a
          class="text-blue-600  hover:underline hover:cursor-pointer"
          href="https://github.com/medynski/angular-online-code-editor"
          alt="an old code sample"
          >github repository</a
        >)
      </li>
    </ul>

    <p class="py-2.5">Future consideration:</p>
    <ul class="list-disc ml-10">
      <li>Fix all "todo" left in the code</li>
      <li>
        Make charts responsive (it needs to be done
        <a
          class="text-blue-600  hover:underline hover:cursor-pointer"
          href="https://www.highcharts.com/demo/stock/responsive"
          alt="check"
          >programmatically</a
        >)
      </li>
      <li>Cover the code by automated tests</li>
      <li>
        Prepare a global interceptor and handler for API requests (at least to
        manage loading state, but error handling reflected in alerts does not
        look fine)
      </li>
      <li>Document components in storybook</li>
      <li>Take care about lighthouse vitals</li>
      <li>
        Implements PWA functionalities to improve web performance
        (manifest.json, ServiceWorker, offline mode, caching strategy)
      </li>
      <li>
        Improve user experience by implementing deferred views instead of lazy
        loading the entire route component
      </li>
    </ul>
  </main>`,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesFeatureHomepageComponent {}
