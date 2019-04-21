import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthapiService }  from '../../../app-shared/_service/authapi.service';
import { UserService } from '../../_service/user.service'
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const API_URL = environment.API_URL;

let httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'applications/json'})
};

@Injectable()
export class SchoolService {

  constructor(
    private http: HttpClient, 
    private authapiService: AuthapiService,
    private userService: UserService
  ) { }

  getNetAmount() {
    return this.http.get(API_URL + '/school/dashboard/?action=nettotal')
    .map((resp: any) => {
      return resp;
    })
   // .catch(error => this.authapiService.handleError(error));
  }
  getTransactions(pushdata) {
    if(pushdata.limit){
      pushdata.offset           =   (pushdata.currentPage-1) * pushdata.limit;
    }
    return this.http.post(API_URL + '/school/transaction/?action=viewtranx', pushdata, httpOptions)
    .map((resp: any) => {
      return resp;
    })
   // .catch(error => this.authapiService.handleError(error));
  }
  getTransactionByFeesId(feesId: any) {
    return this.http.get(API_URL + '/school/transaction/?action=byFeesId&feesId=' + feesId + '&pagenation=false')
    .map((resp: any) => {
      return resp;
    })
   // .catch(error => this.authapiService.handleError(error));
  }
  updateTransaction(formvalues: any) {
    formvalues['modifiedBy'] = this.userService.userBasicDetails[0].userName;
    const data = formvalues;
     return this.http.post(API_URL + '/school/transaction-update/', data, httpOptions)
     .map((resp: any) => {
       return resp;
     })
     .catch((error: any) => {
      this.authapiService.handleError(error, 'secure');
      return Observable.throw(error);
    })
     .finally(()=> this.onEnd());
  }

  addTransaction(formvalues: any) {
    formvalues['modifiedBy'] = this.userService.userBasicDetails[0].userName;
    const data = formvalues;
     return this.http.post(API_URL + '/school/transaction-add/', data, httpOptions)
     .map((resp: any) => {
       return resp;
     })
     .catch((error: any) => {
      this.authapiService.handleError(error, 'secure');
      return Observable.throw(error);
    })
     .finally(()=> this.onEnd());
  }
  onEnd(): void {
    throw new Error("Method not implemented.");
  }

}
