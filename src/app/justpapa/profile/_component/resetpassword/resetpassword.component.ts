import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';
import { ApiService } from 'app/app-shared/_service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../../app-shared/_service/utilities.service';
import { ReferenceService } from '../../../../app-shared/_service/reference.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from "../../_service/profile.service";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  crudForm: FormGroup;
  isSubmitClicked: boolean = false;
  showSpinner: boolean = false;
  messageBox: any;
  showMessageContainer: boolean = false;
  

  constructor(
    private translate: TranslateService,
    private authApiService: AuthapiService,
    private fb: FormBuilder,
    private utilService: UtilitiesService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.referenceForm();
  }
  referenceForm(){
    this.crudForm = this.fb.group({
      password:     ['', Validators.required],
      cnfPassword:  ['', Validators.required]
    });
  }
  userActionPerformed() {
    this.isSubmitClicked = true;
  }
  resetForm(){
    this.isSubmitClicked = false;
    this.showSpinner = false;
    this.crudForm.reset();
  }
  onSubmitClicked(){
    this.userActionPerformed();
    if (!this.crudForm.valid) {
      return;
    } else {
      this.updatePassword();
    }
  }
  updatePassword() {
    const payload = this.crudForm.getRawValue();
    this.showSpinner  = true;
    this.profileService.updatePassword(payload)
    .subscribe((resp: any) => {
      this.showSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showSpinner = false;
    });
  }

}
