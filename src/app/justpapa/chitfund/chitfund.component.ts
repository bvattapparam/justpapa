import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { ApiService } from 'app/app-shared/_service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../app-shared/_service/utilities.service';
import { ReferenceService } from '../../app-shared/_service/reference.service';
import { ChitfundService } from './_service/chitfund.service';

@Component({
  selector: 'app-chitfund',
  templateUrl: './chitfund.component.html',
  styleUrls: ['./chitfund.component.scss']
})
export class ChitfundComponent implements OnInit {
  
  showModuleSpinner: any = false;
  refData: any;
  _manipulatedReference: any;
  showChitGroup: any = false;
  personObj: any;
  person: any;
  searchForm: FormGroup;

  constructor(
    private chitService: ChitfundService,
    private translateService: TranslateService,
    private authApiService: AuthapiService,
    private refService: ReferenceService,
    private _router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const publicParamList = this.refService.getPublicParam();
    this.refData = publicParamList['references'];
    this._manipulatedReference = this.refService.getManipulatedReference();
    this.person = this.chitService.getPerson();
    this.referenceForm();
    this.searchForm.patchValue({
      person: this.person
    });
    if (this.person) {
      this.onPersonChange(this.person);
    }
    
  }
  referenceForm(){
    this.searchForm = this.fb.group({
      person: ['']
    });
  }
  onPersonChange(targetValue: any) {
    if (targetValue !== '0') {
      this.chitService.setPerson(targetValue)
      const payload = {};
      payload['person'] = targetValue;
      this.personObj = Object.assign({}, payload);
      this.showChitGroup = true;
    } else {
      this.showChitGroup = false;
      this.chitService.setPerson('');
    }
    
    
  }
}
