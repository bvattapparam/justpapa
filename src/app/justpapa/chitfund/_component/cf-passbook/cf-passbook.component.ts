import { Component, OnInit, Input } from '@angular/core';
import { ChitfundService } from '../../_service/chitfund.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReferenceService } from '../../../../app-shared/_service/reference.service';
import { ViewdatapopupComponent } from '../../../_modal/viewdatapopup/viewdatapopup.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cf-passbook',
  templateUrl: './cf-passbook.component.html',
  styleUrls: ['./cf-passbook.component.scss']
})
export class CfPassbookComponent implements OnInit {

@Input() passbookData: any = [];
chitfundData: any;
@Input() chitId: any;
_manipulatedReference: any;
paid: any;
profit: any;
hasMatured: any = false;
maturedValue: any;
showModuleSpinner: any = false;
  constructor(
    private refService: ReferenceService,
    private _router: Router,
    private modalService: NgbModal,
    private chitfundService: ChitfundService
  ) {
  }

  ngOnInit() {
    const chitfundData = this.chitfundService.getChitfundGroupList().filter(x => x.chitId === this.chitId);
    this.chitfundData = chitfundData;
    this.paid = this.calculateSum(this.passbookData);
    this.maturedValue = this.chitfundData[0].maturedValue ? this.chitfundData[0].maturedValue : '';
    this.profit = Number(this.chitfundData[0].maturedValue - this.paid);
    this._manipulatedReference = this.refService.getManipulatedReference();
    if (this.chitfundData[0].status === 'GENSTATUS11') {
      this.hasMatured = true;
    }
  }
  createNew() {
    this._router.navigate(['/secure/chitfund/chitfundpassbookcrud/add/'  + this.chitId]);
  }
  editData(passbookId: any) {
    this._router.navigate(['/secure/chitfund/chitfundpassbookcrud/edit/' + this.chitId + '/'  + passbookId]);
  }
  calculateSum(value: any){
    let sum = 0;
    this.passbookData.forEach((id: any)=>{
      sum +=parseInt(id.amount, 10)
    });
    return sum;
  }
  viewData(record: any) {
    
    const modalRef = this.modalService.open (ViewdatapopupComponent, {size: 'lg',  centered: false});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = '';
    modalRef.componentInstance.section = 'PASSBOOK_CONF';
    modalRef.componentInstance.content = record;
  }

}
