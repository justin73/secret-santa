import { Component, HostBinding } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: `<app-root></app-root>`
})
export class AppComponent {
  @HostBinding('class') public cssClass = 'body_background';
  title = 'app';
}

@Component({
  selector: '<app-root></app-root>',
  template: '<router-outlet></router-outlet>'
})
export class ChildComponent {
  constructor(private rootComp: AppComponent) {  }
  setClass() {
    this.rootComp.cssClass = 'class2';
  }
}
