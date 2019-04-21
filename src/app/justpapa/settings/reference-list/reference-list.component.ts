import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../_service/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['./reference-list.component.scss']
})
export class ReferenceListComponent implements OnInit {
  referenceCategoryList: any;
  showModuleSpinner = false;
  errorMessge: any;
  categoryCode: any;
  
  constructor(
    private settingsService: SettingsService, 
    private translate: TranslateService, 
    private authapiService: AuthapiService, 
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.categoryCode = this._activatedRoute.snapshot.paramMap.get('code');
    this.getReferenceByCategory();
  }

  createNew() {
    this._router.navigate(['/secure/settings/referencelistcrud/add/' + this.categoryCode]);
  }
  editData(refCode: any, categoryCode: any) {
    this._router.navigate(['/secure/settings/referencelistcrud/edit/' + refCode + '/' + categoryCode]);
  }
  showReference(id: any) {
    this._router.navigate(['/secure/settings/referencelist/' + id]);
  }
    
  getReferenceByCategory() {
    this.showModuleSpinner = true;
    this.settingsService.getReferenceByCategory(this.categoryCode)
    .subscribe((resp: any) => {
      this.referenceCategoryList = resp;
      console.log('ref', resp)
      this.showModuleSpinner = false
    }, (err)=> {
      this.showModuleSpinner = false;
      this.authapiService.handleError(err, 'secure');
    }); 
  }

}
