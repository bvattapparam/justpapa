import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../_auth/auth.service';
import { AuthapiService } from '../../app-shared/_service/authapi.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfopopupComponent } from '../_modal/infopopup/infopopup.component';

let httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'applications/json'})
};

const API_URL = environment.API_URL;
@Injectable()
export class UserService {

  userBasicDetails:any;

  constructor(
    private authService: AuthService, 
    private authApiServiceShared: AuthapiService,
    private http: HttpClient,
    private modalService: NgbModal
    ) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.authService.getPrivateTokenLocally()) {
        this.loadUserDetails().subscribe(
          (resp: any) => {
            resolve(true);
          }
        );
      } else {
        this.backToLogin();
      }
    })
  }

  loadUserDetails(){
    return forkJoin(this.getUserInfo(), this.getUserPreference())
    .map((resp) => {
      return resp;
    }, (err: any) => {
      this.backToLogin();
    })
    .catch(err => this.backToLogin())
  }

  backToLogin(): any{
    const modalRef = this.modalService.open(InfopopupComponent, {centered: false});
    modalRef.componentInstance.popupTitle = 'sample title';
    modalRef.componentInstance.content = 'sample content is here';
    return modalRef.result.then(resp => {
     window.location.href = environment.login_urlcu;
    })
  }

  getUserInfo(): any{
    const data = '{"privateToken": "' + this.authService.privateToken + '" }';
    return this.http.post(API_URL + '/usermanager/user-basic-details/', data, httpOptions)
    .map((resp: any) => {
      this.userBasicDetails = resp.userBasicDetails;
      return this.userBasicDetails;
    })
  }
  getUserPreference():any{
    return 'user perference';
  }

}
