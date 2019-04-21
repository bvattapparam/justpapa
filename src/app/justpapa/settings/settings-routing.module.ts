import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { RefCategoryComponent } from './ref-category/ref-category.component';
import { RefCategoryCrudComponent } from './ref-category-crud/ref-category-crud.component';
import { ReferenceListComponent } from './reference-list/reference-list.component';
import { ReferenceListCrudComponent } from './reference-list-crud/reference-list-crud.component';
import { ReferencesComponent } from './references/references.component';

const routes: Routes = [
  // {path: '', component: SettingsComponent},
  {path: '', redirectTo:'settings', component: SettingsComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'references', component: ReferencesComponent},
  {path: 'refcategory', component: RefCategoryComponent},
  {path: 'refcategorycrud', component: RefCategoryCrudComponent},
  {path: 'refcategorycrud/:flagType', component: RefCategoryCrudComponent},
  {path: 'refcategorycrud/:flagType/:id', component: RefCategoryCrudComponent},
  {path: 'referencelist/:code', component: ReferenceListComponent},
  {path: 'referencelistcrud/:flagType/:categoryCode', component: ReferenceListCrudComponent},
  {path: 'referencelistcrud/:flagType/:refCode/:categoryCode', component: ReferenceListCrudComponent},
  {path: '**', redirectTo:'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
