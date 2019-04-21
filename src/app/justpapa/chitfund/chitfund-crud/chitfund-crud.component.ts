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
import { ChitfundService } from '../_service/chitfund.service';
import { DateService } from '../../../app-shared/_service/date.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chitfund-crud',
  templateUrl: './chitfund-crud.component.html',
  styleUrls: ['./chitfund-crud.component.scss'],
  providers: [ DatePipe, DateService,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class ChitfundCrudComponent implements OnInit {
  prefillMonth: any;
  tmpMonth: any;
  refData: any;
  showModuleSpinner = false;
  showMessageContainer = false;
  crudForm : FormGroup;
  isSubmitClicked = false;
  flagType: any;
  messageBox: any;
  chitId: any;
  result: any;
  person: any;
  showMaturedValue: any = false;

  constructor(
    private authApiService: AuthapiService,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private refService: ReferenceService,
    private parserFormatter: NgbDateParserFormatter,
    private chitfundService: ChitfundService,
    private utilService: UtilitiesService,
    private dateService: DateService
    ) { }

  ngOnInit() {
    this.chitId = this._activatedRoute.snapshot.paramMap.get('chitId');
    this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
    const publicParamList = this.refService.getPublicParam();
    this.refData = publicParamList['references'];
    this.person = this.chitfundService.getPerson();
    this.referenceForm();
    //this.statusChange();
    if (this.flagType === 'edit') {
      this.getChitfundByChitId();
    }
    if (this.flagType === 'add') {
      this.crudForm.patchValue({
        person: this.person? this.person : ''
      })
    }
  }
  referenceForm(){
    this.crudForm = this.fb.group({
      chitGroup: ['', Validators.required],
      chitValue: ['', Validators.required],
      startDate: ['', Validators.required],
      maturedDate: ['', Validators.required],
      status: ['', Validators.required],
      maturedValue: [null],
      poc: ['', Validators.required],
      person: ['', Validators.required],
      comment: ['', Validators.required]
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
  getChitfundByChitId() {
    this.showModuleSpinner = true;
    this.chitfundService.getChitfundByChitId(this.chitId)
    .subscribe((resp: any) => {
      this.result = resp[0];
      const tmpStartDate = new Date(this.result.startDate);
      const tmpMaturedDate = new Date(this.result.maturedDate);
      const startDate = {
        result: {
          'year'  : tmpStartDate.getFullYear(),
          'month' : tmpStartDate.getMonth()+1,
          'day'   : tmpStartDate.getDate()
        }
      }
      const maturedDate = {
        result: {
          'year'  : tmpMaturedDate.getFullYear(),
          'month' : tmpMaturedDate.getMonth()+1,
          'day'   : tmpMaturedDate.getDate()
        }
      }
      
      this.crudForm.patchValue({
        chitGroup: this.result.chitGroup,
        chitValue: this.result.chitValue,
        startDate: startDate.result,
        maturedDate: maturedDate.result,
        status: this.result.status,
        maturedValue: this.result.maturedValue,
        poc: this.result.poc,
        person: this.result.person,
        comment: this.result.comment
      })
      this.showModuleSpinner = false
    }, (err: any)=> {
      this.showModuleSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }

  onSubmitClicked(){
    this.userActionPerformed();
    if (!this.crudForm.valid) {
      return;
    }
    if (this.crudForm.get('person').value === '0' || this.crudForm.get('status').value === '0') {
      return;
    }
    if (this.flagType === "edit") {
      this.updateChitfund();
    } else if (this.flagType === "add") {
      this.addChitfundGroup();
    }
  }
  statusChange(value) {
    console.log('this.crudForm.get',this.crudForm.get('status').value === 'GENSTATUS11')
    if (this.crudForm.get('status').value === 'GENSTATUS11') {
      const maturedValue = this.crudForm.get('maturedValue');
      this.crudForm.get('status').valueChanges.subscribe(mode =>{
        if (mode === 'GENSTATUS11'){
          this.crudForm.patchValue({
            maturedValue: '100'
          })
          maturedValue.setValidators([Validators.required]);
        } 
        maturedValue.updateValueAndValidity();
      });
  }
  }

  updateChitfund() {
    const payload = this.crudForm.getRawValue();
    payload['chitId']       = this.chitId ? this.chitId : '';
    payload['startDate']    = this.dateService.formatDateTime(this.crudForm.get('startDate').value,2);
    payload['maturedDate']  = this.dateService.formatDateTime(this.crudForm.get('maturedDate').value,2);
    this.showModuleSpinner  = true;
    this.chitfundService.updateChitfund(payload)
    .subscribe((resp: any) => {
      this.showModuleSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showModuleSpinner = false;
    });
  }
  addChitfundGroup() {
    const payload = this.crudForm.getRawValue();
    payload['chitId']       = this.chitId ? this.chitId : '';
    payload['startDate']    = this.dateService.formatDateTime(this.crudForm.get('startDate').value,2);
    payload['maturedDate']  = this.dateService.formatDateTime(this.crudForm.get('maturedDate').value,2);
    this.showModuleSpinner  = true;
    this.chitfundService.addChitfundGroup(payload)
    .subscribe((resp: any) => {
      this.showModuleSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showModuleSpinner = false;
    });
  }
  clearForm(){
    this.resetForm();
  }

}
