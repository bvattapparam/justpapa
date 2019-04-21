import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../_service/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../app-shared/_service/utilities.service';
import { ReferenceService } from '../../../app-shared/_service/reference.service';
import { ApiService } from '../../../app-shared/_service/api.service';

@Component({
  selector: 'app-ref-category-crud',
  templateUrl: './ref-category-crud.component.html',
  styleUrls: ['./ref-category-crud.component.scss']
})
export class RefCategoryCrudComponent implements OnInit {

  singleCategory: any;
  showModuleSpinner = false;
  showMessageContainer = false;
  refForm : FormGroup;
  isSubmitClicked = false;
  flagType: any;
  messageBox: any;


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
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.flagType = this._activatedRoute.snapshot.paramMap.get('flagType');
    if (this.flagType === 'edit') {
      this.getCategoryById(id);
    }
    this.referenceForm();
    if (this.flagType === 'edit') {
      this.refForm.get('code').disable();
    }
    if (this.flagType === 'add') {
      this.refForm.get('code').enable();
    }
  }
  referenceForm(){
    this.refForm = this.fb.group({
      category: ['', Validators.required],
      code: ['', Validators.required]
    });
  }
  getCategoryById(id: any){
    this.showModuleSpinner = true;
    this.settingsService.getCategoryById(id)
    .subscribe((resp: any) => {
      this.singleCategory = resp;
      this.refForm.patchValue({
        category: resp[0].category,
        code: resp[0].code
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
      this.updateCategory();
    } else if (this.flagType === "add") {
      this.addCategory();
    }
    
  }
  updateCategory(){
    this.showModuleSpinner = true;
    this.settingsService.updateRefCategory(this.refForm.getRawValue())
    .subscribe((resp: any) => {
      this.showModuleSpinner = false;
      this.apiService.publicParam = '';
      this.apiService.setDefaultParam().subscribe((resp: any)=>{
        this.refService.setPublicParam(resp);
        }, (err)=> {
          console.log('updated public Param');
        });
      this.messageBox = this.utilService.showMessageBox(resp);
    }, (err)=> {
      this.authapiService.handleError(err, 'secure');
      this.showModuleSpinner = false;
    });

  }
  addCategory(){
    this.showModuleSpinner = true;
    this.settingsService.addRefCategory(this.refForm.getRawValue())
    .subscribe((resp: any) => {
      this.resetForm();
      this.showModuleSpinner = false;
      // update the public param after update the value
      this.apiService.publicParam = '';
      this.apiService.setDefaultParam().subscribe((resp: any)=>{
        this.refService.setPublicParam(resp);
        }, (err)=> {
          console.log('updated public Param');
        });
      this.messageBox = this.utilService.showMessageBox(resp);
    }, (err)=> {
      this.authapiService.handleError(err, 'secure');
      this.showModuleSpinner = false;
    });

  }
  clearForm(){
    this.resetForm();
  }

}
