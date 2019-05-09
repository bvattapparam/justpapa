import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_auth/auth.service';
import { UserService } from '../_service/user.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferenceService } from '../../app-shared/_service/reference.service';
import { ProfileService } from './_service/profile.service';
import { UtilitiesService } from 'app/app-shared/_service/utilities.service';
import { AuthapiService } from 'app/app-shared/_service/authapi.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userPofile: any;
  piggyBanks: any = [
    {'bank': 'State Bank of India', 'purpose': 'Main Savings Operation'},
    {'bank': 'ICICI', 'purpose': 'Home Loan Operation'},
    {'bank': 'Axis', 'purpose': 'Salary Operation'},
    {'bank': 'HDFC', 'purpose': 'Credit Card and Daily Operation'},
    {'bank': 'Punjab National Bank', 'purpose': 'Piggy Basket'}
  ];
  languages: any;
  lngForm: FormGroup;
  _manipulatedReference: any;
  refData: any;
  isSubmitClicked: boolean = false;
  showSpinner: boolean = false;
  messageBox: any;
  showMessageContainer: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService, 
    private translate: TranslateService,
    private fb: FormBuilder,
    private refService: ReferenceService,
    private profileService: ProfileService,
    private utilService: UtilitiesService,
    private authApiService: AuthapiService
    ) { }

  ngOnInit() {
    this._manipulatedReference = this.refService.getManipulatedReference();
    const publicParamList = this.refService.getPublicParam();
    this.refData = publicParamList['references'];
    this.languages = this.refData['LNG'];
    this.userPofile = this.userService.userBasicDetails[0];
    this.formLanguage();
    console.log('lng', this.userPofile['language'])
    this.lngForm.patchValue({
      language: this.userPofile['language']
    })
  }
  formLanguage(){
    this.lngForm = this.fb.group({
      language: ['', Validators.required]
    });
  }
  updateLanguage(lng: any) {
    const payload = this.lngForm.getRawValue();
    this.showSpinner  = true;
    this.profileService.updateLanguage(payload)
    .subscribe((resp: any) => {
      this.showSpinner = false;
      this.messageBox = this.utilService.showMessageBox(resp);
      localStorage.setItem('language', lng);
      this.translate.setDefaultLang(lng);
    }, (err)=> {
      this.authApiService.handleError(err, 'secure');
      this.showSpinner = false;
    });
  }
}
