import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from '../settings/settings.component';
import { SettingsRoutingModule } from '../settings/settings-routing.module';
import { RefCategoryComponent } from './ref-category/ref-category.component';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsService } from './_service/settings.service';
import { RefCategoryCrudComponent } from './ref-category-crud/ref-category-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferenceListComponent } from './reference-list/reference-list.component';
import { ReferenceListCrudComponent } from './reference-list-crud/reference-list-crud.component';
import { ReferencesComponent } from './references/references.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SettingsComponent, RefCategoryComponent, RefCategoryCrudComponent, ReferenceListComponent, ReferenceListCrudComponent, ReferencesComponent],
  providers: [SettingsService]
})
export class SettingsModule { }
