import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
const routes: Routes = [
  //{path: '', component: SchoolComponent},
  {path: '', redirectTo:'profile', component: ProfileComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', redirectTo:'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
