import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './_service/api.service';
import { AuthapiService } from './_service/authapi.service';
import { InfopopupComponent } from './_modal/infopopup/infopopup.component';
import { UtilitiesService } from './_service/utilities.service';
import { ReferenceService } from './_service/reference.service';
import { AsqCurrencyPipe } from './_pipe/asq-currency.pipe';
import { AsqDatePipe } from './_pipe/asq-date.pipe';
import { DateService } from "./_service/date.service";
import { FormatStringPipe } from './_pipe/format-string.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InfopopupComponent, 
    AsqCurrencyPipe, 
    AsqDatePipe, 
    FormatStringPipe
  ],
  exports: [
    InfopopupComponent,
    AsqCurrencyPipe,
    AsqDatePipe,
    FormatStringPipe
  ],
  entryComponents: [
    InfopopupComponent
  ]
})
export class AppSharedModule { 
  static  forRoot(): ModuleWithProviders {
    return {
    ngModule: AppSharedModule,
    providers: [
      ApiService, 
      AuthapiService, 
      UtilitiesService, 
      ReferenceService,
      DateService
    ]
    };
  }
}
