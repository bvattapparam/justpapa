import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GarageService } from '../_service/garage.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReferenceService } from '../../../app-shared/_service/reference.service';
import { ViewdatapopupComponent } from '../../_modal/viewdatapopup/viewdatapopup.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  showSpinner: boolean = false;
  result: any;
  vehicleId: any;
  _manipulatedReference: any;
  flagType: any;
  page: any = 1;
  pageSize: any = 5;
  collectionSize: any;
  previousPage: any;

  constructor(
    private garageService: GarageService,
    private authApiService: AuthapiService,
    private modalService: NgbModal,
    private refService: ReferenceService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private configPagination: NgbPaginationConfig
  ) { 
    this.configPagination.size = 'sm',
    this.configPagination.boundaryLinks = true;
  }
  // Pagination...
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.getTransactions(this.vehicleId);
    }
  }

  // Close pagination...

  ngOnInit() {
    this.vehicleId = this._activatedRoute.snapshot.paramMap.get('vehicleId');
    this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
    this._manipulatedReference = this.refService.getManipulatedReference();
    this.getTransactions(this.vehicleId);
  }
  getTransactions(vehicleId: any){
    this.showSpinner = true;
    let payload                 = {};
    payload['limit']					  =	this.pageSize;
    payload['currentPage']			=	this.page;
    payload['pagenation']				=	true;
    payload['vehicleId']        = vehicleId;
    console.log('payload', payload)
    this.garageService.getTransactions(payload)
    .subscribe((resp: any) => {
      this.result = resp[0].ITEM;
      this.collectionSize = resp[1].TOTAL['collectionSize'];
      this.showSpinner = false
    }, (err: any)=> {
      this.showSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }
  createNew() {
    this._router.navigate(['/secure/garage/transactioncrud/add/' + this.vehicleId]);
  }
  editData(id: any) {
    this._router.navigate(['/secure/garage/transactioncrud/edit/' + id + '/' + this.vehicleId]);
  }

  viewData(record: any) {
    const modalRef = this.modalService.open (ViewdatapopupComponent, {size: 'lg',  centered: false});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = '';
    modalRef.componentInstance.section = 'VEHICLETRNX_CONF';
    modalRef.componentInstance.content = record;
  }
  

}
