import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GarageService } from './_service/garage.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReferenceService } from '../../app-shared/_service/reference.service';
import { ViewdatapopupComponent } from '../_modal/viewdatapopup/viewdatapopup.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {

  showModuleSpinner: any = false;
  result: any;
  vehicleId: any;
  collectionSize: any;
  _manipulatedReference: any;
  flagType: any;

  constructor(
    private garageService: GarageService,
    private authApiService: AuthapiService,
    private modalService: NgbModal,
    private refService: ReferenceService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.vehicleId = this._activatedRoute.snapshot.paramMap.get('vehicleId');
    //this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
    this._manipulatedReference = this.refService.getManipulatedReference();
    this.getVehicles();
  }
  getVehicles(){
    this.showModuleSpinner = true;
    this.garageService.getVehicles()
    .subscribe((resp: any) => {
      this.result = resp[0].ITEM;
      console.log('result', this.result)
      this.collectionSize = resp[1].TOTAL['collectionSize'];
      this.showModuleSpinner = false
    }, (err: any)=> {
      this.showModuleSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }

  viewData(record: any) {
    const modalRef = this.modalService.open (ViewdatapopupComponent, {size: 'lg',  centered: false});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = '';
    modalRef.componentInstance.section = 'GARAGE_CONF';
    modalRef.componentInstance.content = record;
  }
  createNew() {
    console.log('create new')
    this._router.navigate(['/secure/garage/vehiclecrud/add/']);
  }
  editData(vehicleId: any) {
    this._router.navigate(['/secure/garage/vehiclecrud/edit/' + vehicleId]);
  }

}
