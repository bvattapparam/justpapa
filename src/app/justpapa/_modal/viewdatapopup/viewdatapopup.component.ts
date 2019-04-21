import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReferenceService } from '../../../app-shared/_service/reference.service';
import * as ViewLabels from './viewdata-labels.json';
import { TranslateService } from '@ngx-translate/core';
import { AsqDatePipe } from '../../../app-shared/_pipe/asq-date.pipe';

//import * as ViewLabels from '../../../../assets/json/viewdata-labels.json';
@Component({
  selector: 'app-viewdatapopup',
  templateUrl: './viewdatapopup.component.html',
  styleUrls: ['./viewdatapopup.component.scss'],
  providers: [AsqDatePipe]
})
//2019-04-08 10:28:09
export class ViewdatapopupComponent implements OnInit {
  @Input() content: any;
  @Input() popuptitle: any;
  @Input() section: any;
  loader = false;
  refServiceData: any;
  _manipulatedReference: any;
  ViewLabelConfig: any = ViewLabels;
  auditData: any;
  
  constructor(
    public activeModalService: NgbActiveModal,
    private refService: ReferenceService,
    private translateService: TranslateService,
    private asqDate: AsqDatePipe
    ) { }

  ngOnInit() {
    this.refServiceData = this.refService.getPublicParam();
    this._manipulatedReference = this.refService.getManipulatedReference();
    this.auditData = this.getAuditData();
  }

  getAuditData(){
    const createdby = this.translateService.instant('label.createdby') + ' ' + this.content.createdBy;
    const modifiedby = this.translateService.instant('label.modifiedby') + ' ' + this.content.modifiedBy;
    const auditData = createdby + ' on ' + this.asqDate.transform(this.content['createdDate'],'datetime') + '. ' + modifiedby + ' on ' + this.asqDate.transform(this.content['modifiedDate'], 'datetime'); 
    return auditData;
  }

}
