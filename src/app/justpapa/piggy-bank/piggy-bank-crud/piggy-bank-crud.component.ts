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
import { PiggyBankService } from '../_serivce/piggy-bank.service';
import { DateService } from '../../../app-shared/_service/date.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-piggy-bank-crud',
  templateUrl: './piggy-bank-crud.component.html',
  styleUrls: ['./piggy-bank-crud.component.scss'],
  providers: [ DatePipe, DateService,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class PiggyBankCrudComponent implements OnInit {
  prefillMonth: any;
  tmpMonth: any;
  refData: any;
  showModuleSpinner = false;
  showMessageContainer = false;
  crudForm : FormGroup;
  isSubmitClicked = false;
  flagType: any;
  messageBox: any;
  pbId: any;
  result: any;
  person: any;
  showMaturedValue: any = false;

  constructor(
    private authApiService: AuthapiService,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private refService: ReferenceService,
    private parserFormatter: NgbDateParserFormatter,
    private piggyService: PiggyBankService,
    private utilService: UtilitiesService,
    private dateService: DateService
    ) { }

    ngOnInit() {
      this.pbId = this._activatedRoute.snapshot.paramMap.get('pbId');
      this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
      const publicParamList = this.refService.getPublicParam();
      this.refData = publicParamList['references'];
      this.referenceForm();
      //this.statusChange();
      if (this.flagType === 'edit') {
        this.getPassbookBypbId();
      }
      if (this.flagType === 'add') {
        this.crudForm.patchValue({
          person: this.person? this.person : ''
        })
      }
    }

    referenceForm(){
      this.crudForm = this.fb.group({
        month: ['', Validators.required],
        amount: ['', Validators.required],
        basket: ['', Validators.required],
        fromPerson: ['', Validators.required],
        basketOwner: ['', Validators.required],
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
    getPassbookBypbId() {
      this.showModuleSpinner = true;
      this.piggyService.getPassbookBypbId(this.pbId)
      .subscribe((resp: any) => {
        this.result = resp[0];
        console.log('res', this.result)
        const tmpMonth = new Date(this.result.month);
        const month = {
          result: {
            'year'  : tmpMonth.getFullYear(),
            'month' : tmpMonth.getMonth()+1,
            'day'   : tmpMonth.getDate()
          }
        }
        this.crudForm.patchValue({
          month: month.result,
          amount: this.result.amount,
          basket: this.result.basket,
          fromPerson: this.result.fromPerson,
          basketOwner: this.result.basketOwner,
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
    if (this.crudForm.get('basketOwner').value === '0' || this.crudForm.get('fromPerson').value === '0') {
      return;
    }
    if (this.flagType === "edit") {
      this.updatePassbook();
    } else if (this.flagType === "add") {
      this.addPassbook();
    }
  }
  updatePassbook() {
    const payload = this.crudForm.getRawValue();
    payload['pbId']       = this.pbId ? this.pbId : '';
    payload['month']  = this.dateService.formatDateTime(this.crudForm.get('month').value,2);
    this.showModuleSpinner  = true;
    this.piggyService.updatePassbook(payload)
    .subscribe((resp: any) => {
      this.showModuleSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showModuleSpinner = false;
    });
  }
  addPassbook() {
    const payload = this.crudForm.getRawValue();
    payload['pbId']       = this.pbId ? this.pbId : '';
    payload['month']  = this.dateService.formatDateTime(this.crudForm.get('month').value,2);
    this.showModuleSpinner  = true;
    this.piggyService.addPassbook(payload)
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
