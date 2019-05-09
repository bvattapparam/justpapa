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
  selector: 'app-vehicle-crud',
  templateUrl: './vehicle-crud.component.html',
  styleUrls: ['./vehicle-crud.component.scss'],
  providers: [ DatePipe, DateService,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class VehicleCrudComponent implements OnInit {
  refData: any;
  showModuleSpinner = false;
  showMessageContainer = false;
  crudForm : FormGroup;
  isSubmitClicked = false;
  flagType: any;
  messageBox: any;
  vehicleId: any;
  result: any;
  financeData: any = 'GENSTATUS14';

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
      model:          ['', Validators.required],
      make:           ['', Validators.required],
      type:           ['', Validators.required],
      cost:           ['', Validators.required],
      bookedDate:     ['', Validators.required],
      deliveryDate:   ['', Validators.required],
      regNumber:      ['', Validators.required],
      dealer:         ['', Validators.required],
      rm:             ['', Validators.required],
      advancePaid:    ['', Validators.required],
      finance:        ['', Validators.required],
      financeAmount:  [''],
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
        if(mode === "GENSTATUS13") {
          this.crudForm.get('financeAmount').setValidators([Validators.required]);
          this.crudForm.get('financeAmount').updateValueAndValidity();
        } else {
          this.crudForm.get('financeAmount').clearValidators();
          this.crudForm.get('financeAmount').updateValueAndValidity();
        }
      }
    )
  }
  getVehicleByvehicleId() {
    this.showModuleSpinner = true;
    this.garageService.getVehiclesByvehiclId(this.vehicleId)
    .subscribe((resp: any) => {
      this.result = resp[0];
      const bookeddate = this.utilService.dateFormat(new Date(this.result.bookedDate));
      const deliverydate = this.utilService.dateFormat(new Date(this.result.deliveryDate));
      
      this.crudForm.patchValue({
        model:          this.result.model,
        make:           this.result.make,
        type:           this.result.type,
        cost:           this.result.cost,
        bookedDate:     bookeddate,
        deliveryDate:   deliverydate,
        regNumber:      this.result.regNumber,
        dealer:         this.result.dealer,
        rm:             this.result.rm,
        advancePaid:    this.result.advancePaid,
        finance:        this.result.finance,
        financeAmount:  this.result.financeAmount,
        comment:        this.result.comment
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
    if (this.flagType === "edit") {
      this.updateVehicle();
    } else if (this.flagType === "add") {

      this.addVehicle();
    }
  }
  addVehicle() {
    const payload = this.crudForm.getRawValue();
    payload['bookedDate']  = this.dateService.formatDateTime(this.crudForm.get('bookedDate').value,2);
    payload['deliveryDate']  = this.dateService.formatDateTime(this.crudForm.get('deliveryDate').value,2);
    this.showModuleSpinner  = true;
    this.garageService.addVehicle(payload)
    .subscribe((resp: any) => {
      this.showModuleSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
      this.clearForm();
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showModuleSpinner = false;
    });
  }

  updateVehicle() {
    const payload = this.crudForm.getRawValue();
    payload['vehicleId']       = this.vehicleId ? this.vehicleId : '';
    payload['bookedDate']  = this.dateService.formatDateTime(this.crudForm.get('bookedDate').value,2);
    payload['deliveryDate']  = this.dateService.formatDateTime(this.crudForm.get('deliveryDate').value,2);
    this.showModuleSpinner  = true;
    this.garageService.updateVehicle(payload)
    .subscribe((resp: any) => {
      this.showModuleSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showModuleSpinner = false;
    });
  }

}
