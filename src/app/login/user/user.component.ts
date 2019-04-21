import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TranslateService} from '@ngx-translate/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppSharedModule} from '../../app-shared/app-shared.module';
import { InfopopupComponent} from '../../app-shared/_modal/infopopup/infopopup.component';
//import { InfopopupComponent } from '../_modal/infopopup/infopopup.component';
import { AuthapiService } from '../../app-shared/_service/authapi.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm : FormGroup;
  isUserFormValid = true;
  isInvalidUser = false;
  isLoginClicked = false;
  isInvalidCredentials = false;
  showModuleSpinner = false;

  constructor(
    private translate: TranslateService, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private authApiService: AuthapiService,
    private _router: Router
    ) { 
      this.userForm = fb.group({
        username: ['bijesh', Validators.required],
        password: ['test', Validators.required]
      });
  }

  showPopup(content, header){
    const modalRef = this.modalService.open (InfopopupComponent, {size: 'lg', windowClass: 'custom-class-md', centered: false});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = 'Sample title';
    modalRef.componentInstance.content = content;
  }

  userActionPerformed() {
    this.isInvalidUser = false;
    this.isLoginClicked = true;
    //this.showModuleSpinner = true;
  }
  loginbtn(){
    //this.showPopup('ss','sss');
    this.userActionPerformed();
    if (!this.userForm.valid) {
      return;
    } else if (this.userForm.value.username.length >= 10) {
      this.isInvalidUser = true;
      return;
    }
    this.validate();
  }

  validate(){
    this.showModuleSpinner = true;
    this.authApiService.validateUsernamePassword(this.userForm.value.username, this.userForm.value.password)
    .subscribe((resp: any) => {
      this.resetForm();
      sessionStorage.setItem('availableUser', JSON.stringify(resp['AUTHENTICATE']));
      this.navigateToNextStep('justpapa', resp);
    }, (err)=> {
      console.log('error user')
      this.isInvalidCredentials = true;
      this.showModuleSpinner = false;
    });

  }
  resetForm(){
    this.isLoginClicked = false;
    this.isInvalidCredentials = false;
    this.showModuleSpinner = false;
  }
  navigateToNextStep(url, resp){
    if (url === 'justpapa') {
      localStorage.setItem('privatetoken', resp.AUTHDETAILS[0].PRIVATETOKEN);
      this._router.navigate([environment.justpapa_URL]);
    } else {
      this._router.navigate([environment.login_URL]);
    }
  }

  ngOnInit() {
  }

}
