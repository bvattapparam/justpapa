import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PiggyBankService } from './_serivce/piggy-bank.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReferenceService } from '../../app-shared/_service/reference.service';
import { ViewdatapopupComponent } from '../_modal/viewdatapopup/viewdatapopup.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-piggy-bank',
  templateUrl: './piggy-bank.component.html',
  styleUrls: ['./piggy-bank.component.scss']
})
export class PiggyBankComponent implements OnInit {

  showModuleSpinner: any = false;
  result: any;
  pbId: any;
  collectionSize: any;
  _manipulatedReference: any;
  flagType: any;

  constructor(
    private piggyService: PiggyBankService,
    private authApiService: AuthapiService,
    private modalService: NgbModal,
    private refService: ReferenceService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.pbId = this._activatedRoute.snapshot.paramMap.get('pbId');
    //this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
    this._manipulatedReference = this.refService.getManipulatedReference();
    this.getPassbook();
   
    //console.log('group', this.chitfundData)
  }

  getPassbook(){
    this.showModuleSpinner = true;
    this.piggyService.getPassbook()
    .subscribe((resp: any) => {
      this.result = resp[0].ITEM;
      this.collectionSize = resp[1].TOTAL['collectionSize'];
      this.showModuleSpinner = false
    }, (err: any)=> {
      this.showModuleSpinner = false;
      this.authApiService.handleError(err, 'secure');
    }); 
  }
  createNew() {
    this._router.navigate(['/secure/piggybank/piggybankcrud/add/']);
  }
  editData(pbId: any) {
    this._router.navigate(['/secure/piggybank/piggybankcrud/edit/' + pbId]);
  }
  // calculateSum(value: any){
  //   let sum = 0;
  //   this.passbookData.forEach((id: any)=>{
  //     sum +=parseInt(id.amount, 10)
  //   });
  //   return sum;
  // }
  viewData(record: any) {
    const modalRef = this.modalService.open (ViewdatapopupComponent, {size: 'lg',  centered: false});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = '';
    modalRef.componentInstance.section = 'PIGGYBANK_CONF';
    modalRef.componentInstance.content = record;
  }

}
