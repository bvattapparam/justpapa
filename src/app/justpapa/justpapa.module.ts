import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './_service/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { JustpapaRoutingModule } from './justpapa-routing.module';
import { JustpapaComponent } from './justpapa/justpapa.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './_layout/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfopopupComponent } from './_modal/infopopup/infopopup.component';
import { AuthService } from './_auth/auth.service';
import { ApiService} from 'app/app-shared/_service/api.service';
import { AuthapiService} from 'app/app-shared/_service/authapi.service';
import { AppSharedModule } from 'app/app-shared/app-shared.module';
import { CheckuserGuard } from './_guard/checkuser.guard';
import { SidebarComponent } from './_layout/sidebar/sidebar.component';
import { SidebarRightComponent } from './_layout/sidebar-right/sidebar-right.component';
import { EventsService } from './_service/events.service';
import { FooterComponent } from './_layout/footer/footer.component';
import { ViewdatapopupComponent } from './_modal/viewdatapopup/viewdatapopup.component';
import { SharedModule } from './shared/shared.module';
import { CustomDateService } from './_service/custom-date.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    JustpapaRoutingModule,
    TranslateModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppSharedModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    JustpapaComponent, 
    DashboardComponent, 
    HeaderComponent, 
    InfopopupComponent, 
    SidebarComponent, 
    SidebarRightComponent,
    FooterComponent, 
    ViewdatapopupComponent
  ],
  providers: [
    UserService, 
    AuthService, 
    HttpClientModule, 
    CheckuserGuard, 
    EventsService, 
    ApiService, 
    AuthapiService,
    CustomDateService
  ],
    entryComponents:[
      InfopopupComponent,
      ViewdatapopupComponent
    ]
})
export class JustpapaModule { }