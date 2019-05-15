import { Pipe, PipeTransform ,LOCALE_ID, Inject} from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'asqDate'
})
export class AsqDatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private _locale: string){}

  transform(value: any, args?: any): any {
    let _datePipe = new DatePipe('en_US');
      if(args === 'datetime'){
        const splitChar = ' ';
				const input = value;
				const sdate = input.split(splitChar)[0];
				const formattedDate = _datePipe.transform(sdate, 'dd-MMM-yyyy');
				const timeFormatted = input.split(splitChar)[1];
				const timeOptimized = tConvert(timeFormatted);
        return formattedDate + ' ' + timeOptimized ;
      } else {
        let dateInput = value;
        let _paapdate = _datePipe.transform(dateInput,'dd-MMM-yyyy');
        return _paapdate;
      }
    
      function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }
  }

}
