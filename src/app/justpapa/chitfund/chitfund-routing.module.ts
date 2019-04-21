import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChitfundComponent } from './chitfund.component';
import { ChitfundGroupComponent } from './_component/chitfund-group/chitfund-group.component';
import { ChitfundCrudComponent } from './chitfund-crud/chitfund-crud.component';
import { ChitfundPassbookComponent } from './chitfund-passbook/chitfund-passbook.component';
import { ChitfundPassbookCrudComponent } from './chitfund-passbook-crud/chitfund-passbook-crud.component';


const routes: Routes = [
  //{path: '', component: ChitfundComponent},
  {path: '', redirectTo:'chitfund', component: ChitfundComponent},
  {path: 'chitfund', component: ChitfundComponent},
  {path: 'chitfundgroup', component: ChitfundGroupComponent},
  {path: 'chitfundgroupcrud/:flagType', component: ChitfundCrudComponent},
  {path: 'chitfundgroupcrud/:flagType/:chitId', component: ChitfundCrudComponent},
  {path: 'chitfundpassbook/:chitId', component: ChitfundPassbookComponent},
  {path: 'chitfundpassbookcrud/:flagType/:chitId', component: ChitfundPassbookCrudComponent},
  {path: 'chitfundpassbookcrud/:flagType/:chitId/:passbookId', component: ChitfundPassbookCrudComponent},
  {path: '**', redirectTo:'chitfund', component: ChitfundComponent}
];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChitfundRoutingModule { }
