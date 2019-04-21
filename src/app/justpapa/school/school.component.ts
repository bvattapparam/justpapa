import { Component, OnInit } from '@angular/core';
import { SchoolService } from './_service/school.service';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { ReferenceService } from 'app/app-shared/_service/reference.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  showModuleSpinner: any = false;
  netAmount: any;
  publicParam: any;
  refCategory: any;
  _manipulatedReference: any;

  constructor(
    private schoolService: SchoolService,
    private authApiService: AuthapiService,
    private refService: ReferenceService
  ) { }

  ngOnInit() {
    const publicParam = this.refService.getPublicParam();
    this.refCategory = publicParam['refcategory']
    this._manipulatedReference = this.refService.getManipulatedReference();

    this.getNetAmount();
  }

  getNetAmount() {
    this.showModuleSpinner = true;
    this.schoolService.getNetAmount()
    .subscribe((resp: any) => {
      this.netAmount = resp[0].ITEM;
      this.showModuleSpinner = false
    }, (err)=> {
      this.showModuleSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }

}
