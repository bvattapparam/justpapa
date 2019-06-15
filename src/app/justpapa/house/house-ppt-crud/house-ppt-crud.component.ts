import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { ApiService } from 'app/app-shared/_service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../app-shared/_service/utilities.service';
import { ReferenceService } from '../../../app-shared/_service/reference.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../../app-shared/_utilities/dateformat';
import { HouseService } from '../_service/house.service';
import { DateService } from '../../../app-shared/_service/date.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-house-ppt-crud',
  templateUrl: './house-ppt-crud.component.html',
  styleUrls: ['./house-ppt-crud.component.scss'],
  providers: [ DatePipe, DateService,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class HousePptCrudComponent implements OnInit {

  refData: any;
  showSpinner = false;
  showMessageContainer = false;
  crudForm : FormGroup;
  isSubmitClicked = false;
  flagType: any;
  messageBox: any;
  houseId: any;
  result: any;
  id: any;

  constructor(
    private authApiService: AuthapiService,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private refService: ReferenceService,
    private parserFormatter: NgbDateParserFormatter,
    private houseService: HouseService,
    private utilService: UtilitiesService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.houseId            = this._activatedRoute.snapshot.paramMap.get('houseId');
    this.id                 = this._activatedRoute.snapshot.paramMap.get('id');
    this.flagType           = this._activatedRoute.snapshot.paramMap.get('flagType');
    const publicParamList   = this.refService.getPublicParam();
    this.refData            = publicParamList['references'];
    this.referenceForm();
    if (this.flagType === 'edit') {
      //this.updateForm();
    }
    if (this.flagType === 'add') {
      this.crudForm.patchValue({
        houseId: this.houseId
      })
    }
  }
  referenceForm(){
    this.crudForm = this.fb.group({
      houseId:        ['', Validators.required],
      bill:           ['', Validators.required],
      paidDate:       ['', Validators.required],
      amount:         ['', Validators.required],
      payMode:        ['', Validators.required],
      comment:        ['', Validators.required]
    });
  }
  userActionPerformed() {
    this.isSubmitClicked = true;
  }
  resetForm(){
    this.isSubmitClicked = false;
    this.showSpinner = false;
    this.crudForm.reset();
  }
  clearForm(){
    this.resetForm();
  }
  // updateForm(){
  //   this.result = this.houseService.getHousePPTByHouseId().filter(x => x.id === this.id);
  //   const paidDate = this.utilService.dateFormat(new Date(this.result[0]['paidDate']));
  //   this.crudForm.patchValue({
  //     houseId:            this.result[0]['houseId'],
  //     bill:               this.result[0]['bill'],
  //     paidDate:           this.result[0]['paidDate'],
  //     amount:             this.result[0]['amount'],
  //     payMode:            paidDate,
  //     comment:            this.result[0]['comment'],
  //   })
  // }

  onSubmitClicked(){
    this.messageBox = [];
    this.userActionPerformed();
    if (!this.crudForm.valid) {
      return;
    }
    if (this.crudForm.get('houseId').value === '0') {
      return;
    }
    if (this.flagType === "edit") {
      this.updateHouse();
    } else if (this.flagType === "add") {
      this.addHouse();
    }
  }
  addHouse() {
    const payload = this.crudForm.getRawValue();
    payload['houseId']        = this.houseId ? this.houseId : '';
    payload['bookedDate']     = this.dateService.formatDateTime(this.crudForm.get('bookedDate').value,2);
    payload['handoverDate']   = this.dateService.formatDateTime(this.crudForm.get('handoverDate').value,2);
    this.showSpinner  = true;
    this.houseService.addHouse(payload)
    .subscribe((resp: any) => {
      this.showSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
      this.clearForm();
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showSpinner = false;
    });
  }
  updateHouse() {
    const payload = this.crudForm.getRawValue();
    payload['houseId']        = this.houseId ? this.houseId : '';
    payload['bookedDate']     = this.dateService.formatDateTime(this.crudForm.get('bookedDate').value,2);
    payload['handoverDate']   = this.dateService.formatDateTime(this.crudForm.get('handoverDate').value,2);
    this.showSpinner  = true;
    this.houseService.updateHouse(payload)
    .subscribe((resp: any) => {
      this.showSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showSpinner = false;
    });
  }

}
