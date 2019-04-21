import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChitfundService } from '../../_service/chitfund.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReferenceService } from '../../../../app-shared/_service/reference.service';
import { ViewdatapopupComponent } from '../../../_modal/viewdatapopup/viewdatapopup.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chitfund-master',
  templateUrl: './chitfund-group.component.html',
  styleUrls: ['./chitfund-group.component.scss']
})
export class ChitfundGroupComponent implements OnInit, OnChanges {

@Input() personObj: any;

  showModuleSpinner: any = false;
  result: any;
  refServiceData: any;
  _manipulatedReference: any;
  page: any = 1;
  pageSize: any = 2;
  collectionSize: any;
  previousPage: any;
  constructor(
    private chitService: ChitfundService,
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
  }
  ngOnChanges(changes: any):void {
    const person = changes.personObj['currentValue']['person'];
    this.getChitFundMaster(person);
  }


  editData(chitId: any) {
    this._router.navigate(['/secure/chitfund/chitfundgroupcrud/edit/' + chitId]);
  }
  createNew() {
    this._router.navigate(['/secure/chitfund/chitfundgroupcrud/add']);
  }
  viewPassbook(chitId: any){
    this._router.navigate(['/secure/chitfund/chitfundpassbook/' + chitId]);
  }

  viewData(record: any) {
    const modalRef = this.modalService.open (ViewdatapopupComponent, {size: 'lg',  centered: false});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = '';
    modalRef.componentInstance.section = 'CHITFUND_CONF';
    modalRef.componentInstance.content = record;
  }

  getChitFundMaster(person: any) {
    this.showModuleSpinner = true;
    let payload                 = {};
    payload['limit']					  =	this.pageSize;
    payload['currentPage']			=	this.page;
    payload['pagenation']				=	false;
    payload['person']           = person;
    this.chitService.getChitFundMaster(payload)
    .subscribe((resp: any) => {
      this.result = resp[0].ITEM;
      this.chitService.setChitfundGroupList(this.result);
      this.collectionSize = resp[1].TOTAL['collectionSize'];
      this.showModuleSpinner = false
    }, (err)=> {
      this.showModuleSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }

}
