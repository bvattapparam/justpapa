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
  selector: 'app-house-crud',
  templateUrl: './house-crud.component.html',
  styleUrls: ['./house-crud.component.scss'],
  providers: [ DatePipe, DateService,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class HouseCrudComponent implements OnInit {

  refData: any;
  showModuleSpinner = false;
  showMessageContainer = false;
  crudForm : FormGroup;
  isSubmitClicked = false;
  flagType: any;
  messageBox: any;
  houseId: any;
  result: any;
  financeData: any = 'GENSTATUS14';

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
    this.houseId = this._activatedRoute.snapshot.paramMap.get('houseId');
    this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
    const publicParamList = this.refService.getPublicParam();
    this.refData = publicParamList['references'];
    this.referenceForm();
    if (this.flagType === 'edit') {
      this.getVehicleByvehicleId();
      this.financeLogic(this.financeData);
    }
    if (this.flagType === 'add') {
      this.crudForm.patchValue({
        finance: this.financeData
      })
    }
  }
  referenceForm(){
    this.crudForm = this.fb.group({
      houseId:        ['', Validators.required],
      builder:        ['', Validators.required],
      type:           ['', Validators.required],
      bhk:            ['', Validators.required],
      location:       ['', Validators.required],
      finance:        ['', Validators.required],
      financeAmount:  ['', Validators.required],
      bank:           ['', Validators.required],
      rm:             ['', Validators.required],
      bookedDate:     ['', Validators.required],
      handoverDate:   ['', Validators.required],
      comment:        ['', Validators.required]
    });
  }
  userActionPerformed() {
    this.isSubmitClicked = true;
  }
  resetForm(){
    this.isSubmitClicked = false;
    this.showModuleSpinner = false;
    this.crudForm.reset();
  }
  clearForm(){
    this.resetForm();
  }
  chnageFinance(value: any) {
    this.financeData = value;
    this.financeLogic(this.financeData);
  }
  financeLogic(financedata: any){
    this.financeData = financedata;
    this.crudForm.get('finance').valueChanges.subscribe(
      (mode: string) =>{
        if(mode === "GENOPT1") {
          this.crudForm.get('financeAmount').setValidators([Validators.required]);
          this.crudForm.get('financeAmount').updateValueAndValidity();
        } else {
          this.crudForm.get('financeAmount').clearValidators();
          this.crudForm.get('financeAmount').updateValueAndValidity();
        }
      }
    )
  }

}
