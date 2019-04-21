import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JustpapaComponent } from './justpapa/justpapa.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckuserGuard } from './_guard/checkuser.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: '', component: JustpapaComponent, canActivate:[CheckuserGuard],
  children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'settings', loadChildren: './settings/settings.module#SettingsModule'},
    {path: 'school', loadChildren: './school/school.module#SchoolModule'},
    {path: 'chitfund', loadChildren: './chitfund/chitfund.module#ChitfundModule'},
    {path: 'piggybank', loadChildren: './piggy-bank/piggy-bank.module#PiggyBankModule'},
    {path: 'garage', loadChildren: './garage/garage.module#GarageModule'},
    {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JustpapaRoutingModule { }
