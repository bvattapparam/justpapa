import { Injectable } from '@angular/core';
import { DatePipe }  from '@angular/common';

@Injectable()
export class DateService {

  constructor(
    private datePipe: DatePipe
  ) { }
  formatDateTime(date: any, flag: any){
    console.log('reached...', date, flag)
    const now:Date = new Date(date.year, date.month-1, date.day);
    let formattedDate: any;
    switch(flag){
      case 0:
      formattedDate = this.datePipe.transform(now, 'MM-dd-y');
      break;
      case 1:
      formattedDate = this.datePipe.transform(now, 'dd-MM-y');
      break;
      case 2:
      formattedDate = this.datePipe.transform(now, 'y-MM-dd');
      break;
    }
    return formattedDate;
  }
}
