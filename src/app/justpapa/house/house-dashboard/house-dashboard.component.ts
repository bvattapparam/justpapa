import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { ApiService } from 'app/app-shared/_service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../app-shared/_service/utilities.service';
import { ReferenceService } from '../../../app-shared/_service/reference.service';
import { HouseService } from '../_service/house.service';

@Component({
  selector: 'app-house-dashboard',
  templateUrl: './house-dashboard.component.html',
  styleUrls: ['./house-dashboard.component.scss']
})
export class HouseDashboardComponent implements OnInit {
  showSpinner: boolean = false;
  refData: any;
  _manipulatedReference: any;
  searchOn: boolean = false;
  house: any;
  searchForm: FormGroup;
  actionObj = [
    {'action': 'Maintenance', 'summary': 'Spent till date', 'icon': 'fa fa-gears'},
    {'action': 'Electricity', 'summary': 'Spent till date', 'icon': 'fa fa-lightbulb-o'},
    {'action': 'PropertyTax', 'summary': 'Spent till date', 'icon': 'fa fa-money'},
    {'action': 'Water', 'summary': 'Spent till date', 'icon': 'fa fa-tint'}
  ];
  result: any;
  flagType: any;
  housePaymentList: any;

  constructor(
    private houseService: HouseService,
    private translateService: TranslateService,
    private authApiService: AuthapiService,
    private refService: ReferenceService,
    private _router: Router,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    //this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
    const publicParamList = this.refService.getPublicParam();
    this.refData = publicParamList['references'];
    this._manipulatedReference = this.refService.getManipulatedReference();
    this.house = this.houseService.getHouse();
    this.referenceForm();
    this.searchForm.patchValue({
      house: this.house
    });
     if (this.house) {
       this.onHouseChange(this.house);
     }
    
  }
  referenceForm(){
    this.searchForm = this.fb.group({
      house: ['']
    });
  }
  editData() {
    this._router.navigate(['/secure/house/housecrud/edit/' + this.house], this.result);
  }
  onHouseChange(targetValue: any) {
    this.house = targetValue;
    if (targetValue !== '0') {
      this.houseService.setHouse(targetValue)
      const payload = {};
      payload['house'] = targetValue;
      this.getHouseDetailsByHouseId(targetValue);
      //this.getHousePaymentByHouseId(targetValue);
      //this.houseObj = Object.assign({}, payload);
      this.searchOn = true;
    } else {
      this.searchOn = false;
      this.houseService.setHouse('');
    }
  }

  getHouseDetailsByHouseId(houseId: any){
    this.showSpinner = true;
    this.houseService.getHouseDetailsByHouseId(houseId)
    .subscribe((resp: any) => {
      this.result = resp;
      this.houseService.setHouseBasicDetails(this.result);
      this.showSpinner = false
    }, (err)=> {
      this.showSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }

  
}
