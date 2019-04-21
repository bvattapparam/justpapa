import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChitfundService } from '../_service/chitfund.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReferenceService } from '../../../app-shared/_service/reference.service';
import { ViewdatapopupComponent } from '../../_modal/viewdatapopup/viewdatapopup.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chitfund-passbook',
  templateUrl: './chitfund-passbook.component.html',
  styleUrls: ['./chitfund-passbook.component.scss']
})
export class ChitfundPassbookComponent implements OnInit {
  flagType: any;
  chitId: any;
  showModuleSpinner: any = false;
  result: any;
  chitfundData: any;
  passbookData: any;

  constructor(
    private chitfundService: ChitfundService,
    private authApiService: AuthapiService,
    private modalService: NgbModal,
    private refService: ReferenceService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.chitId = this._activatedRoute.snapshot.paramMap.get('chitId');
    this.chitfundData = this.chitfundService.getChitfundGroupList();
    this.getPassbookByChitId(this.chitId);
    console.log('group', this.chitfundData)
  }
  getPassbookByChitId(chitId: any){
    this.showModuleSpinner = true;
    this.chitfundService.getPassbookByChitId(this.chitId)
    .subscribe((resp: any) => {
      this.result = resp;
      console.log('result', this.passbookData)
      this.showModuleSpinner = false
    }, (err: any)=> {
      this.showModuleSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }

}
