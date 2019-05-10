import { Component, OnInit, Input } from '@angular/core';
import { ReferenceService } from 'app/app-shared/_service/reference.service';

@Component({
  selector: 'app-house-basic-details',
  templateUrl: './house-basic-details.component.html',
  styleUrls: ['./house-basic-details.component.scss']
})
export class HouseBasicDetailsComponent implements OnInit {
  refData: any;
  _manipulatedReference: any;
@Input() basicDetails: any;
  constructor(
    private refService: ReferenceService
  ) { }

  ngOnInit() {
    const publicParamList = this.refService.getPublicParam();
    this.refData = publicParamList['references'];
    this._manipulatedReference = this.refService.getManipulatedReference();
  }

}
