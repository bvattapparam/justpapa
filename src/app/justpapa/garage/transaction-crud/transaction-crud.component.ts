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
import { GarageService } from '../_service/garage.service';
import { DateService } from '../../../app-shared/_service/date.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-crud',
  templateUrl: './transaction-crud.component.html',
  styleUrls: ['./transaction-crud.component.scss'],
  providers: [ DatePipe, DateService,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class TransactionCrudComponent implements OnInit {
  refData: any;
  showSpinner: boolean = false;
  showMessageContainer = false;
  crudForm : FormGroup;
  isSubmitClicked: boolean = false;
  flagType: any;
  messageBox: any;
  vehicleId: any;
  id: any;
  result: any;
  _manipulatedReference: any;

  constructor(
    private authApiService: AuthapiService,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private refService: ReferenceService,
    private parserFormatter: NgbDateParserFormatter,
    private garageService: GarageService,
    private utilService: UtilitiesService,
    private dateService: DateService
    ) { }

  ngOnInit() {
    this.vehicleId = this._activatedRoute.snapshot.paramMap.get('vehicleId');
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
    const publicParamList = this.refService.getPublicParam();
    this.refData = publicParamList['references'];
    this.referenceForm();
    this.statusChange('');
    this._manipulatedReference = this.refService.getManipulatedReference();
    if (this.flagType === 'edit') {
     this.getTransactionById();
    }
    // if (this.flagType === 'add') {
    //   this.crudForm.patchValue({
    //     person: this.person? this.person : ''
    //   })
    // }
  }
  referenceForm(){
    this.crudForm = this.fb.group({
      amount: ['', Validators.required],
      purpose: ['', Validators.required],
      tranxDate: ['', Validators.required],
      item: [null],
      serviceStation: [null],
      comment: ['', Validators.required]
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
  getTransactionById() {
    this.showSpinner = true;
    this.garageService.getTransactionById(this.id)
    .subscribe((resp: any) => {
      this.result = resp;
      const tranxDate = this.utilService.dateFormat(new Date(this.result.tranxDate));
      this.crudForm.patchValue({
        tranxDate:      tranxDate,
        amount:         this.result.amount,
        purpose:        this.result.purpose,
        serviceStation: this.result.serviceStation,
        item:           this.result.item,
        comment:        this.result.comment
      })
      this.showSpinner = false
    }, (err: any)=> {
      this.showSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }

  statusChange(value: any) {
    //VHPUR1 : service
    //VHPUR3: accessories
    const serviceStation = this.crudForm.get('serviceStation');
    const item = this.crudForm.get('item');
    this.crudForm.get('purpose').valueChanges.subscribe(value => {
      if (value === 'VHPUR1'){
        serviceStation.setValidators([Validators.required]);
        serviceStation.updateValueAndValidity();
      } else if (value === 'VHPUR3') {
        item.setValidators([Validators.required]);
        item.updateValueAndValidity();
      } else {
        serviceStation.setValidators(null);
        serviceStation.updateValueAndValidity();
        item.setValidators(null);
        item.updateValueAndValidity();
      }
    });
  }
  
  onSubmitClicked(){
    this.userActionPerformed();
    if (!this.crudForm.valid) {
      return;
    }
    if (this.crudForm.get('purpose').value === '0') {
      return;
    }
    if (this.flagType === "edit") {
      this.updateTransaction();
    } else if (this.flagType === "add") {
      this.addTransaction();
    }
  }
  addTransaction() {
    const payload = this.crudForm.getRawValue();
    payload['vehicleId']  = this.vehicleId ? this.vehicleId : '';
    payload['tranxDate']  = this.dateService.formatDateTime(this.crudForm.get('tranxDate').value,2);
    this.showSpinner  = true;
    this.garageService.addTransaction(payload)
    .subscribe((resp: any) => {
      this.showSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
      this.clearForm();
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showSpinner = false;
    });
  }
  updateTransaction() {
    const payload = this.crudForm.getRawValue();
    payload['vehicleId']  = this.vehicleId ? this.vehicleId : '';
    payload['tranxDate']  = this.dateService.formatDateTime(this.crudForm.get('tranxDate').value,2);
    this.showSpinner  = true;
    this.garageService.updateTransaction(payload)
    .subscribe((resp: any) => {
      this.showSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showSpinner = false;
    });
  }
  clearForm(){
    this.resetForm();
  }

}
