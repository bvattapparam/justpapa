import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthapiService }  from '../../../app-shared/_service/authapi.service';
import { UserService } from '../../_service/user.service'
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const API_URL = environment.API_URL;

let httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'applications/json'})
};
@Injectable()
export class PiggyBankService {
  person: any;
  chitfundGroupList: any;

  constructor(
    private http: HttpClient, 
    private authapiService: AuthapiService,
    private userService: UserService
  ) { }
  getPassbook() {
    return this.http.get(API_URL + '/piggybank/transaction/?action=fullview')
    .map((resp: any) => {
      return resp;
    })
    .catch((error: any) => {
      this.authapiService.handleError(error, 'secure');
      return Observable.throw(error);
    })
     .finally(()=> this.onEnd());
  }
  getPassbookBypbId(pbId: any) {
    return this.http.get(API_URL + '/piggybank/transaction/?action=bypbId&pbId=' + pbId + '&pagenation=false')
    .map((resp: any) => {
      return resp;
    })
    .catch((error: any) => {
      this.authapiService.handleError(error, 'secure');
      return Observable.throw(error);
    })
     .finally(()=> this.onEnd());
  }
  addPassbook(formvalues: any) {
    formvalues['modifiedBy'] = this.userService.userBasicDetails[0].userName;
    const payload = formvalues;
     return this.http.post(API_URL + '/piggybank/transaction-add/', payload, httpOptions)
     .map((resp: any) => {
       return resp;
     })
     .catch((error: any) => {
      this.authapiService.handleError(error, 'secure');
      return Observable.throw(error);
    })
     .finally(()=> this.onEnd());
  }
  updatePassbook(formvalues: any) {
    formvalues['modifiedBy'] = this.userService.userBasicDetails[0].userName;
    const payload = formvalues;
     return this.http.post(API_URL + '/piggybank/transaction-update/', payload, httpOptions)
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
