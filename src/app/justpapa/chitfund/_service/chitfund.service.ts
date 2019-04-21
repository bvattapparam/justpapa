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
export class ChitfundService {
  person: any;
  chitfundGroupList: any;

  constructor(
    private http: HttpClient, 
    private authapiService: AuthapiService,
    private userService: UserService
  ) { }

  setPerson(value: any) {
    this.person = '';
    this.person = value;
  }
  getPerson() {
    return this.person;
  }
  setChitfundGroupList(groupList) {
    this.chitfundGroupList = groupList;
  }
  getChitfundGroupList(){
    return this.chitfundGroupList;
  }
  
  getChitFundMaster(payload: any) {
    return this.http.post(API_URL + '/chitfund/chitfund-group/?action=fullview', payload, httpOptions)
    .map((resp: any) => {
      return resp;
    })
   // .catch(error => this.authapiService.handleError(error));
  }
  getChitfundByChitId(chitId: any) {
    return this.http.get(API_URL + '/chitfund/chitfund-group/?action=byChitId&chitId=' + chitId + '&pagenation=false')
    .map((resp: any) => {
      return resp;
    })
   // .catch(error => this.authapiService.handleError(error));
  }

  getPassbookByChitId(chitId: any) {
    return this.http.get(API_URL + '/chitfund/chitfund-passbook/?action=byChitId&chitId=' + chitId + '&pagenation=false')
    .map((resp: any) => {
      return resp;
    })
   // .catch(error => this.authapiService.handleError(error));
  }

  getPassbookByPassbookId(passbookId: any) {
    return this.http.get(API_URL + '/chitfund/chitfund-passbook/?action=byPassbookId&passbookId=' + passbookId + '&pagenation=false')
    .map((resp: any) => {
      return resp;
    })
   // .catch(error => this.authapiService.handleError(error));
  }

  addChitfundGroup(formvalues: any) {
    formvalues['modifiedBy'] = this.userService.userBasicDetails[0].userName;
    const data = formvalues;
     return this.http.post(API_URL + '/chitfund/chitfund-group-add/', data, httpOptions)
     .map((resp: any) => {
       return resp;
     })
     .catch((error: any) => {
      this.authapiService.handleError(error, 'secure');
      return Observable.throw(error);
    })
     .finally(()=> this.onEnd());
  }
  updateChitfund(formvalues: any) {
    formvalues['modifiedBy'] = this.userService.userBasicDetails[0].userName;
    const data = formvalues;
     return this.http.post(API_URL + '/chitfund/chitfund-group-update/', data, httpOptions)
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
    const data = formvalues;
     return this.http.post(API_URL + '/chitfund/chitfund-passbook-add/', data, httpOptions)
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
    const data = formvalues;
     return this.http.post(API_URL + '/chitfund/chitfund-passbook-update/', data, httpOptions)
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
