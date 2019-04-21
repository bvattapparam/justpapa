import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Pipe({
  name: 'asqCurrency'
})
export class AsqCurrencyPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let piper = new CurrencyPipe('en-IN'); // TODO why need this param by default.
   return piper.transform(value,'INR', 'symbol');
  }

}
