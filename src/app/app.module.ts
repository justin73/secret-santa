import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponentComponent } from './home-component/home-component.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { ManagememberComponent } from './managemember/managemember.component';
import { ViewsantaComponent } from './viewsanta/viewsanta.component';
import { MemberService } from "./service/member.service";

// Define the routes
const ROUTES = [
  {
    path: '',
    component: HomeComponentComponent
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
    HomeComponentComponent,
    AdminpanelComponent,
    ManagememberComponent,
    ViewsantaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
