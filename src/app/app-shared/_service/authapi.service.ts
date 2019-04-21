import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/observable';
import { ApiService } from '../_service/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfopopupComponent } from '../_modal/infopopup/infopopup.component';
import { TranslateService } from '@ngx-translate/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/finally'
import { resolve, reject } from 'q';

let httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'applications/json'})
};

const API_URL = environment.API_URL;

@Injectable()
export class AuthapiService {
  userName: any;
  privateToken: any;
  defaultParam: any;

  constructor(private http: HttpClient, private apiService: ApiService, 
    private modalService: NgbModal, private translate: TranslateService) { }
  
  validateUsernamePassword(username: string, password: string){
    const validateUser = this.validateUsername(username);
    return validateUser.mergeMap(user => this.validatePassword(password, username))
    .finally(()=> this.onEnd());
  }
  
  validateUsername(username: string): Observable<any> {
    const data = '{"username":"' + username + '" }';
    return this.http.post(API_URL + '/login/validate-username/', data, httpOptions)
    .map((resp: any) => {
      this.userName = resp.AUTHDETAILS[0].USERNAME;
      return resp;
    })
    .finally(()=> this.onEnd());
   // .catch();
  }
  validatePassword(password: string, username: string): Observable<any> {
    const data = '{"username": "' + username + '","password": "' + password + '" }';
    return this.http.post(API_URL + '/login/validate-password/', data, httpOptions)
    .map((resp: any) => {
      this.privateToken = resp.AUTHDETAILS[0].PRIVATETOKEN;
      localStorage.setItem('privatetoken', this.privateToken);
      return resp;
    })
    .finally(()=> this.onEnd())
    .catch((error: any) => {
      this.handleError(error, 'nosecure');
      return Observable.throw(error);
  });
  }

   handleError(error: Response, errorType: string) {
    if (error.status===404 || error.status===0 || error.status.toString().startsWith('5') || error.status.toString()==='400' || error.status.toString()==='401' || error.status.toString()==='402') {
      if (errorType === 'secure') {
        return this.errorPrompt('errortitle.serviceerror','message.serviceerror');
      } else {
        return this.redirectToLogout('errortitle.serviceerror','message.serviceerror');
      }
    }
    return Observable.throw(error);
  }

   moveToLogout(){
    window.location.href = environment.logout_URL;
    //window.location.reload();
  }
  redirectToLogout(header: any, content: any){
    const modalRef = this.modalService.open(InfopopupComponent, {size: 'lg', windowClass: 'custom-class-md',  centered: true});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = this.translate.instant(header);
    modalRef.componentInstance.content = this.translate.instant(content);
     return modalRef.result.then(resp => {
       console.log('reacehd')
       this.moveToLogout();
     })
  }

  errorPrompt(header: any, content: any){
    const modalRef = this.modalService.open(InfopopupComponent, {size: 'lg', windowClass: 'custom-class-md',  centered: true});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = this.translate.instant(header);
    modalRef.componentInstance.content = this.translate.instant(content);
     return modalRef.result.then(resp => {
       console.log('Error occured...')
     })
  }

  bootstrapLogin(): Promise<any> {
    return new Promise((resolve, reject)=>{
      this.apiService.setDefaultParam().subscribe((resp: any)=>{
      //this.defaultParam = resp['defaultReference'];
      resolve(true);
      }, (err)=> {
        reject();
      });
    });
  }
  private onEnd(): void {
    // nothing...
  }
  

}
