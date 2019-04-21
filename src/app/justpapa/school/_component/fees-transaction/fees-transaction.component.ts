import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../_service/school.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReferenceService } from '../../../../app-shared/_service/reference.service';
import { ViewdatapopupComponent } from '../../../_modal/viewdatapopup/viewdatapopup.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fees-transaction',
  templateUrl: './fees-transaction.component.html',
  styleUrls: ['./fees-transaction.component.scss']
})
export class FeesTransactionComponent implements OnInit {

  showModuleSpinner: any = false;
  transactionData: any;
  refServiceData: any;
  _manipulatedReference: any;
  page: any = 1;
  pageSize: any = 2;
  collectionSize: any;
  previousPage: any;

  constructor(
    private schoolService: SchoolService,
    private translateService: TranslateService,
    private authApiService: AuthapiService,
    private refService: ReferenceService,
    private modalService: NgbModal,
    private _router: Router,
    private configPagination: NgbPaginationConfig
  ) { 
    this.configPagination.size = 'sm',
    this.configPagination.boundaryLinks = true;
    
  }

  ngOnInit() {
    this.refServiceData = this.refService.getPublicParam();
    this._manipulatedReference = this.refService.getManipulatedReference();
    this.getTransaction();
  }

  viewData(record: any) {
    const modalRef = this.modalService.open (ViewdatapopupComponent, {size: 'lg',  centered: false});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = '';
    modalRef.componentInstance.section = 'SCHOOL_CONF';
    modalRef.componentInstance.content = record;
  }

  editData(feesId: any) {
    this._router.navigate(['/secure/school/schoolcrud/edit/' + feesId]);
  }
  createNew() {
    this._router.navigate(['/secure/school/schoolcrud/add']);
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.getTransaction();
    }
  }

  getTransaction() {
    this.showModuleSpinner = true;
    let payload                 = {};
    payload['limit']					  =	this.pageSize;
    payload['currentPage']			=	this.page;
    payload['pagenation']				=	true;
    this.schoolService.getTransactions(payload)
    .subscribe((resp: any) => {
      this.transactionData = resp[0].ITEM;
      this.collectionSize = resp[1].TOTAL['collectionSize'];
      this.showModuleSpinner = false
    }, (err)=> {
      this.showModuleSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }

}
