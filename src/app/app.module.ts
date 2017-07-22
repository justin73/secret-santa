import { AppComponent, ChildComponent } from './app.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { ManagememberComponent } from './managemember/managemember.component';
import { ViewsantaComponent } from './viewsanta/viewsanta.component';
import { MemberService } from './service/member.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// Define the routes
const ROUTES = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin-port',
    component: AdminpanelComponent
  },
  {
    path: 'manage-members',
    component: ManagememberComponent
  },
  {
    path: 'check-santa',
    component: ViewsantaComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminpanelComponent,
    ManagememberComponent,
    ViewsantaComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [MemberService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
