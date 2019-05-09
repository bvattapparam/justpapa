import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from '../profile/profile-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from './_service/profile.service';
import { AppSharedModule } from '../../app-shared/app-shared.module';
import { SharedModule } from '../shared/shared.module';
import { ResetpasswordComponent } from './_component/resetpassword/resetpassword.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppSharedModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    ResetpasswordComponent
  ],
  providers:[
    ProfileService
  ]
})

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ProfileModule { }
