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
  selector: 'app-house-purchase-crud',
  templateUrl: './house-purchase-crud.component.html',
  styleUrls: ['./house-purchase-crud.component.scss'],
  providers: [ DatePipe, DateService,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class HousePurchaseCrudComponent implements OnInit {
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
    this.houseId = this.houseService.getHouse();
    this.id       = this._activatedRoute.snapshot.paramMap.get('id');
    this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
    const publicParamList = this.refService.getPublicParam();
    this.refData = publicParamList['references'];
    this.referenceForm();
    if(this.flagType === 'edit') {
      this.updateForm();
    }
  }
  referenceForm(){
    this.crudForm = this.fb.group({
      houseId:        ['', Validators.required],
      paidDate:       ['', Validators.required],
      payMode:        ['', Validators.required],
      pmNumber:       ['', Validators.required],
      purpose:        ['', Validators.required],
      receipt:        ['', Validators.required],
      amount:         ['', Validators.required],
      poc:            ['', Validators.required],
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
  updateForm(){
    this.result = this.houseService.getHousePurchaseData().filter(x => x.id === this.id);
    console.log('result', this.result);
    const paidDate = this.utilService.dateFormat(new Date(this.result[0]['paidDate']));
    this.crudForm.patchValue({
      houseId:      this.result[0]['houseId'],
      paidDate:     paidDate,
      payMode:      this.result[0]['payMode'],
      pmNumber:     this.result[0]['pmNumber'],
      purpose:      this.result[0]['purpose'],
      receipt:      this.result[0]['receipt'],
      amount:       this.result[0]['amount'],
      poc:          this.result[0]['poc'],
      comment:      this.result[0]['comment'],
    })
  }
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
      this.updateHousePurchase();
    } else if (this.flagType === "add") {
      //this.addHouse();
    }
  }
  updateHousePurchase() {
    const payload = this.crudForm.getRawValue();
    payload['houseId']        = this.houseId ? this.houseId : '';
    payload['id']             = this.id? this.id : '';
    payload['paidDate']       = this.dateService.formatDateTime(this.crudForm.get('paidDate').value,2);
    this.showSpinner          = true;
    this.houseService.updateHousePurchase(payload)
    .subscribe((resp: any) => {
      this.showSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showSpinner = false;
    });
  }

}
