# Angular Coding Assignment

**Notice: To see my solution to the problem described below [follow this URL](https://github.com/medynski/coding-assignment-angular/pull/1) **

The goal of this assignment is to test your coding style, ability to work with libraries/frameworks documentation and to develop features using Angular.

After task completion we will discuss your solution together during the interview and talk about the decisions you have made and solutions you proposed.

Do not create PR to this repository. Create your own repository using this template repository!


## Getting Started

Copy this template repository and use nx monorepo workspace starter we provided to start coding. App is in apps directory and libraries in libs directory. At the end of this readme you have default readme tips provided by nx. For further information about coding in Nx Workspace please use their docs/tutorials etc..


## The App
The company is developing a solution for indoor location. Only hardware solution is ready now. Basically every employee carry a badge and our solution could track their position inside the building.
This app should display employees data, allow to update their data and display dashboard with charts. We have another system that maps position to status. In this app status is important.

Company CEO found great opportunity to sell our solution. Client want to see it in action but there is a catch. It needs to be demoed tomorrow but there is no working API ready yet but there is a chance to deliver because API is defined.
Backend devs said that tomorrow morning they will have working API. CEO asked you to create some showcase app to impress the client. You need to just mock some data (tomorrow you will switch to real API) and make it done.
You do not have time to implement everything so pick most important requirements from list prepared with Product Owner.

### Overall requirements:
- use PrimeNg components library (if you prefer use library of your choice)
- use Prime Icons (if you prefer use other solution of your choice)
- for layouts and responsiveness use CSS Grid and/or Flexbox
- all views should be responsive up to 320px (mobile small)
- for charts use highcharts-angular (https://github.com/highcharts/highcharts-angular) (if you prefer use other solution of your choice)
- install dependencies if something is missing. Your solution should work out of the box after npm install.
- if you use different components or icons library then for specific components like PrimeNG Table mentioned below use similar components from library of your choice.


## Ideal App requirements

### App Skeleton:
- fix main menu - currently menu items do not expand
- add menu responsiveness (behaviour for small screens) - pick your solution
- add app routing - follow redirectLinks for menu items defined in app.component.ts (`path: ''` should redirect to entities/homepage path where `HomepageComponent` should appear)
- `EntitiesFeatureListModule` and `EntitiesFeatureLocationDashboardModule` should be Lazy Loaded, inside that modules create proper components for List and dashboard view (in our system entity means employee).

### Features:

### Feature data-repostiory library:
- API is not ready yet, but you need to deliver, so you need to create mock service `entity-mock.service.ts` that imitate real API behaviour described in `entity.service.ts`. Methods in mock service should have delay (1000 ms) on response and should randomly return error 403 with probability equals to 0.1. You should use this mock service to interact with data in developed app.
- all components should use `EntityService` for data interaction. `MockEntityService` should be used in a way that allow to switch to the target implementation (`EntityService`) by changing one file (All components that uses `EntityService` should not require changes).

### Feature Entity List
- Create entity list component in `entities-feature-list` library.
- Display list of all entities using PrimeNG Table.
- Table should contain all columns except entity ID.
- if entity is inactive then in `Is Active` column for that entity you should display text: 'Inactive' with red prime icon named: `pi-exclamation-triangle`
- visibility of columns should be selectable by multiselect component and that selection should be saved in local storage and it should be read from also on list init.
- search input should be created. It should filter entity list by `name` and `trackingId`. Please have in mind that this is costly operation on backend side so be prepared.

### Feature Entity Details
- create entity details component that should appear after click on entity name in the entity list
- component should display all `EntityDetails` data
- after click on edit button it should switch to edit mode and allow to edit all three fields from the `EntityUpdateDto` where `entityType` should be selected from available types (get data from service).
- please use reactive forms
- validate for required fields
- name should be unique so please write validator that uses entities list endpoint with `GetEntityListParams` `name` field too check uniqueness.
- name should not equal to trackingId - please validate
- save button should trigger entire form validation and if form is valid it should update entity.
- after proper update user should land in the entity details page and after error should be redirected to entity list page.
- use PrimeNg MessageService to Display Toast on update success and on error.

### Feature Location Dashboard
- in `EntitiesFeatureLocationDashboardModule` create component to display location dashboard
- prepare data in `MockEntityService` for `LocationStats`. Use `lastWeekLocationOccupancy` field from mock service and map `lastWeekVisitsLog` to `lastWeekEmployeesVisits`
- display `LocationStats` data using two charts. Please select chart types appropriate for data.


# *********** END OF TASK ***********

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
