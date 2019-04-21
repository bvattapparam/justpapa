import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../_service/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ref-category',
  templateUrl: './ref-category.component.html',
  styleUrls: ['./ref-category.component.scss']
})
export class RefCategoryComponent implements OnInit {
  referenceCategoryList: any;
  showModuleSpinner = false;
  errorMessge: any;
  
  constructor(
    private settingsService: SettingsService, 
    private translate: TranslateService, 
    private authapiService: AuthapiService, 
    private _router: Router
    ) { }

  ngOnInit() {
    console.log('Reference', this.settingsService.gettest());
    this.getReferenceCategory();
  }
  createNew() {
  this._router.navigate(['/secure/settings/refcategorycrud/add']);
  }
  editData(id: any) {
    this._router.navigate(['/secure/settings/refcategorycrud/edit/' + id]);
  }
  showReference(id: any) {
    this._router.navigate(['/secure/settings/referencelist/' + id]);
  }
  getReferenceCategory() {
    this.showModuleSpinner = true;
    this.settingsService.getReferenceCategory()
    .subscribe((resp: any) => {
      this.referenceCategoryList = resp;
      this.showModuleSpinner = false
    }, (err)=> {
      this.showModuleSpinner = false;
      this.authapiService.handleError(err, 'secure');
    }); 
  }


}
