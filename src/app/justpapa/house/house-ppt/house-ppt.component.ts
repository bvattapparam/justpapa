import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { ApiService } from 'app/app-shared/_service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../app-shared/_service/utilities.service';
import { ReferenceService } from '../../../app-shared/_service/reference.service';
import { HouseService } from '../_service/house.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewdatapopupComponent } from 'app/justpapa/_modal/viewdatapopup/viewdatapopup.component';

@Component({
  selector: 'app-house-ppt',
  templateUrl: './house-ppt.component.html',
  styleUrls: ['./house-ppt.component.scss']
})
export class HousePptComponent implements OnInit {
  showSpinner: boolean = false;
  refData: any;
  _manipulatedReference: any;
  searchOn: boolean = false;
  house: any;
  flagType: any;
  result: any;
  
  constructor(
    private houseService: HouseService,
    private translateService: TranslateService,
    private authApiService: AuthapiService,
    private refService: ReferenceService,
    private _router: Router,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private modalService: NgbModal, 
  ) { }


  ngOnInit() {
    const publicParamList = this.refService.getPublicParam();
    this.refData = publicParamList['references'];
    this._manipulatedReference = this.refService.getManipulatedReference();
    this.house = this.houseService.getHouse();
    this.getPPTByHouseId(this.house);
  }
  getPPTByHouseId(houseId: any){
    this.showSpinner = true;
    this.houseService.getPPTByHouseId(houseId)
    .subscribe((resp: any) => {
      this.result = resp;
      this.houseService.setHousePurchaseData(this.result[0].ITEM);
      this.showSpinner = false
    }, (err)=> {
      this.showSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }
  viewData(record: any) {
    const modalRef = this.modalService.open (ViewdatapopupComponent, {size: 'lg',  centered: false});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = '';
    modalRef.componentInstance.section = 'HOUSEPURCHASE_CONF';
    modalRef.componentInstance.content = record;
  }

  editData(id: any) {
    this._router.navigate(['/secure/house/housepurchasecrud/edit/' + id]);
  }

}
