import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ForgotpasswordComponent } from 'app/login/forgotpassword/forgotpassword.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { CloseinfoComponent } from './closeinfo/closeinfo.component';
import { DefaultGuard } from './_guard/default.guard';

const routes: Routes = [{
  path: '', component: LoginComponent, canActivate:[DefaultGuard],
  children: [
    {path: '', redirectTo: 'user', pathMatch: 'full'},
    {path: 'user', component: UserComponent},
    {path: 'forgotpwd', component: ForgotpasswordComponent},
    {path: 'createuser', component: CreateuserComponent},
    {path: 'closeinfo', component: CloseinfoComponent},
    {path: '**', redirectTo: 'user', pathMatch: 'full'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
