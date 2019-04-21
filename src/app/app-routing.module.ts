import { NgModule, ModuleWithProviders } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';
import { AppComponent } from 'app/app.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
  { path: '', redirectTo: 'login',pathMatch:'full' },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule'},
  { path: 'secure', loadChildren: 'app/justpapa/justpapa.module#JustpapaModule'},
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
], {useHash: true});
@NgModule({
  imports: [ rootRouting ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
