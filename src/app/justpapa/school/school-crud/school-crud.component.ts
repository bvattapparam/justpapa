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
import { SchoolService } from '../_service/school.service';
import {DatePipe} from '@angular/common';
import {DateService} from '../../../app-shared/_service/date.service';


@Component({
  selector: 'app-school-crud',
  templateUrl: './school-crud.component.html',
  styleUrls: ['./school-crud.component.scss'],
  providers: [ DatePipe, DateService,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class SchoolCrudComponent implements OnInit {
  

  prefillMonth: any;
  tmpMonth: any;
  refData: any;
  showModuleSpinner = false;
  showMessageContainer = false;
  refForm : FormGroup;
  isSubmitClicked = false;
  flagType: any;
  messageBox: any;
  feesId: any;
  transactionData: any;

  constructor(
    private authApiService: AuthapiService,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private refService: ReferenceService,
    private parserFormatter: NgbDateParserFormatter,
    private schoolService: SchoolService,
    private utilService: UtilitiesService,
    private dp: DatePipe,
    private ds: DateService
    ) { }

    ngOnInit() {
      this.feesId = this._activatedRoute.snapshot.paramMap.get('feesId');
      this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');

      const publicParamList = this.refService.getPublicParam();
      this.refData = publicParamList['references'];
      this.referenceForm();
      if (this.flagType === 'edit') {
        this.getTransactionByFeesId();
        //this.refForm.get('refCode').disable();
      }
      if (this.flagType === 'edit' || this.flagType ==='add') {
        //this.refForm.get('categoryCode').disable();
        //this.refForm.patchValue({person: this.categoryCode});
      }
     
    }
   
    referenceForm(){
      this.refForm = this.fb.group({
        person: ['', Validators.required],
        purpose: ['', Validators.required],
        institution: ['', Validators.required],
        status: ['', Validators.required],
        month: [{}, Validators.required],
        amount: ['', Validators.required],
        comment: ['', Validators.required]
      });
    }
  
    userActionPerformed() {
      this.isSubmitClicked = true;
    }
    resetForm(){
      this.isSubmitClicked = false;
      this.showModuleSpinner = false;
      this.refForm.reset();
    }
    getTransactionByFeesId() {
      this.showModuleSpinner = true;
      this.schoolService.getTransactionByFeesId(this.feesId)
      .subscribe((resp: any) => {
        this.transactionData = resp[0];
        // manipulate the date
        this.tmpMonth = new Date(this.transactionData.month); //this.dateService.formatDateTime(this.transactionData.month, 2);
        this.prefillMonth = {
          schoolMonth: {
            'year': this.tmpMonth.getFullYear(),
            'month': this.tmpMonth.getMonth()+1,
            'day': this.tmpMonth.getDate()
          }
        }
        
        this.refForm.patchValue({
          person: this.transactionData.person,
          purpose: this.transactionData.purpose,
          institution: this.transactionData.institution,
          status: this.transactionData.status,
          amount: this.transactionData.amount,
          month: this.prefillMonth.schoolMonth,
          comment: this.transactionData.comment
        })
        this.showModuleSpinner = false
        console.log('Transaction Item ', resp[0].person)
      }, (err)=> {
        this.showModuleSpinner = false;
        this.authApiService.handleError(err, 'secure');
      }); 
    }
    onSubmitClicked(){
      this.userActionPerformed();
      if (!this.refForm.valid) {
        return;
      }
      if (this.flagType === "edit") {
        this.updateTransaction();
      } else if (this.flagType === "add") {
        this.addTransaction();
      }
    }

    updateTransaction() {
      const payload = this.refForm.getRawValue();
      payload['feesId'] = this.feesId ? this.feesId : '';
      payload['month'] = this.ds.formatDateTime(this.refForm.get('month').value,2);
      this.showModuleSpinner = true;
      this.schoolService.updateTransaction(payload)
      .subscribe((resp: any) => {
        this.showModuleSpinner = false;
        this.messageBox = this.utilService.showMessageBox(resp);
      }, (err)=> {
        this.authApiService.handleError(err, 'secure');
        this.showModuleSpinner = false;
      });
    }

    addTransaction() {
      const payload = this.refForm.getRawValue();
      payload['feesId'] = this.feesId ? this.feesId : '';
      payload['month'] = this.ds.formatDateTime(this.refForm.get('month').value,2);
      this.showModuleSpinner = true;
      this.schoolService.addTransaction(payload)
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
