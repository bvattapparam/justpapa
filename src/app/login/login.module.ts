import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfopopupComponent } from './_modal/infopopup/infopopup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { AuthapiService } from '../app-shared/_service/authapi.service';
import { CloseinfoComponent } from './closeinfo/closeinfo.component';
import { ApiService } from '../app-shared/_service/api.service';
import { AppSharedModule } from 'app/app-shared/app-shared.module';
import { DefaultGuard } from './_guard/default.guard';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule.forRoot(),
    AppSharedModule
  ],
  declarations: [LoginComponent, UserComponent, InfopopupComponent, ForgotpasswordComponent, CreateuserComponent, CloseinfoComponent],
  providers: [HttpClientModule, DefaultGuard,AuthapiService, ApiService],
  entryComponents: [InfopopupComponent]
})
export class LoginModule { }
// export function HttpLoaderFactory(http: HttpClient){
//   return new TranslateHttpLoader(http,'./assets/i18n/');
// }
