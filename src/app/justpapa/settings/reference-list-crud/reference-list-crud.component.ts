import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../_service/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { ApiService } from 'app/app-shared/_service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../app-shared/_service/utilities.service';
import { ReferenceService } from '../../../app-shared/_service/reference.service';

@Component({
  selector: 'app-reference-list-crud',
  templateUrl: './reference-list-crud.component.html',
  styleUrls: ['./reference-list-crud.component.scss']
})
export class ReferenceListCrudComponent implements OnInit {

  //singleCategory: any;
  refCategoryList: any;
  singleReference: any;
  showModuleSpinner = false;
  showMessageContainer = false;
  refForm : FormGroup;
  isSubmitClicked = false;
  flagType: any;
  messageBox: any;
  categoryCode: any;
  refCode: any;
  referenceCategoryList: any;

  constructor(
    private settingsService: SettingsService, 
    private translate: TranslateService, 
    private authapiService: AuthapiService, 
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private utilService: UtilitiesService,
    private refService: ReferenceService,
    private apiService: ApiService
    ) { }
 

  ngOnInit() {
    this.refCode = this._activatedRoute.snapshot.paramMap.get('refCode');
    this.categoryCode = this._activatedRoute.snapshot.paramMap.get('categoryCode');
    this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
    const publicParamList = this.refService.getPublicParam();
    this.refCategoryList = publicParamList['refcategory'];
    console.log('public', publicParamList)
    if (this.flagType === 'edit') {
      this.getReferenceByCode(this.refCode);
    }
    this.referenceForm();
    if (this.flagType === 'edit') {
     this.refForm.get('refCode').disable();
    }
    if (this.flagType === 'edit' || this.flagType ==='add') {
      this.refForm.get('categoryCode').disable();
      this.refForm.patchValue({categoryCode: this.categoryCode});
    }
  }
  referenceForm(){
    this.refForm = this.fb.group({
      categoryCode: ['', Validators.required],
      referenceName: ['', Validators.required],
      refCode: ['']
    });
  }

  getReferenceByCode(refCode: any){
    this.showModuleSpinner = true;
    this.settingsService.getReferenceByCode(refCode)
    .subscribe((resp: any) => {
      this.singleReference = resp;
      this.refForm.patchValue({
        categoryCode: resp[0].categoryCode,
        referenceName: resp[0].referenceName,
        refCode: resp[0].code
      });
      this.showModuleSpinner = false
    }, (err)=> {
      this.showModuleSpinner = false;
      this.authapiService.handleError(err, 'secure');
    }); 
  }

  userActionPerformed() {
    this.isSubmitClicked = true;
  }
  resetForm(){
    this.isSubmitClicked = false;
    this.showModuleSpinner = false;
    this.refForm.reset();
  }

  onSubmitClicked(){
    this.userActionPerformed();
    if (!this.refForm.valid) {
      return;
    }
    if (this.flagType === "edit") {
      this.updateReference();
    } else if (this.flagType === "add") {
      this.addReference();
    }
  }

  updateReference(){
    this.showModuleSpinner = true;
    this.settingsService.updateReference(this.refForm.getRawValue())
    .subscribe((resp: any) => {
      this.showModuleSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
      // update the public param after update the value
      this.apiService.publicParam = '';
      this.apiService.setDefaultParam().subscribe((resp: any)=>{
        this.refService.setPublicParam(resp);
        }, (err)=> {
          console.log('updated public Param');
        });
    }, (err)=> {
      this.authapiService.handleError(err, 'secure');
      this.showModuleSpinner = false;
    });
  }

  addReference(){
    this.showModuleSpinner = true;
    this.settingsService.addReference(this.refForm.getRawValue())
    .subscribe((resp: any) => {
      //this.resetForm();
      this.showModuleSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
      // update the public param after update the value
      this.apiService.publicParam = '';
      this.apiService.setDefaultParam().subscribe((resp: any)=>{
        this.refService.setPublicParam(resp);
        }, (err)=> {
          console.log('updated public Param');
        });
    }, (err)=> {
      this.authapiService.handleError(err, 'secure');
      this.showModuleSpinner = false;
    });
  }
  
  clearForm(){
    this.resetForm();
  }

}
