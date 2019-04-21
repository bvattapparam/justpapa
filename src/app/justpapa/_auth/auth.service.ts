import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw'

@Injectable()
export class AuthService {

  public privateToken: any;

  constructor() { }
  public getPrivateTokenLocally(){
    this.privateToken = localStorage.getItem('privatetoken');
    return this.privateToken;
  }
  public logout(): any {
    this.moveToLogout();
  }
  public moveToLogout(){
    window.location.href = environment.logout_URL;
    //window.location.reload();
  }

}
