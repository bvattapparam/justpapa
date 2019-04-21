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
  selector: 'app-chitfund-passbook-crud',
  templateUrl: './chitfund-passbook-crud.component.html',
  styleUrls: ['./chitfund-passbook-crud.component.scss'],
  providers: [ DatePipe, DateService,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class ChitfundPassbookCrudComponent implements OnInit {
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
  passbookId: any;
  result: any;
  person: any;
  showMaturedValue: any = false;
  showSavebtn: any = true;
  constructor(
    private authApiService: AuthapiService,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private refService: ReferenceService,
    private parserFormatter: NgbDateParserFormatter,
    private chitfundService: ChitfundService,
    private utilService: UtilitiesService,
    private dateService: DateService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.chitId = this._activatedRoute.snapshot.paramMap.get('chitId');
    this.passbookId = this._activatedRoute.snapshot.paramMap.get('passbookId');
    this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
    const publicParamList = this.refService.getPublicParam();
    this.refData = publicParamList['references'];
    this.person = this.chitfundService.getPerson();
    this.referenceForm();
    if (this.flagType === 'edit') {
      this.getPassbookByPassbookId(this.passbookId);
    }
    
  }

  referenceForm(){
    this.crudForm = this.fb.group({
      month: ['', Validators.required],
      amount: ['', Validators.required],
      payMode: ['', Validators.required],
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

  onSubmitClicked(){
    this.userActionPerformed();
    if (!this.crudForm.valid) {
      return;
    }
    if (this.crudForm.get('payMode').value === '0') {
      return;
    }
    if (this.flagType === "edit") {
      this.updateChitfund();
    } else if (this.flagType === "add") {
      this.addPassbook();
    }
  }

  getPassbookByPassbookId(passbookId: any) {
    this.showModuleSpinner = true;
    console.log('passbookid', passbookId)
    this.chitfundService.getPassbookByPassbookId(passbookId)
    .subscribe((resp: any) => {
      this.result = resp[0];
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
        payMode: this.result.payMode,
        comment: this.result.comment
      });
      this.showModuleSpinner = false
    }, (err: any)=> {
      this.showModuleSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }
  

  updateChitfund() {
    const payload = this.crudForm.getRawValue();
    payload['chitId']       = this.chitId ? this.chitId : '';
    payload['passbookId']   = this.passbookId ? this.passbookId : '';
    payload['month']        = this.dateService.formatDateTime(this.crudForm.get('month').value,2);
    this.showModuleSpinner  = true;
    this.chitfundService.updatePassbook(payload)
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
    payload['chitId']       = this.chitId ? this.chitId : '';
    payload['month']        = this.dateService.formatDateTime(this.crudForm.get('month').value,2);
    this.showModuleSpinner  = true;
    this.chitfundService.addPassbook(payload)
    .subscribe((resp: any) => {
      this.showModuleSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showModuleSpinner = false;
    });
    this.showSavebtn = false;
   
  }

  clearForm(){
    this.resetForm();
  }

}
