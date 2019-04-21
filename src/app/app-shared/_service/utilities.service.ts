import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw'
import { of } from 'rxjs/observable/of';

@Injectable()
export class UtilitiesService {
  showMessageBoxBundle: any = {};
  constructor() { }

  showMessageBox(resp: any){
    this.showMessageBoxBundle['showMessageContainer'] = true;
    if (resp.msg) {
      this.showMessageBoxBundle['messageContent'] = resp.msg;
      this.showMessageBoxBundle['msgClass'] = 'success';
    } else {
      this.showMessageBoxBundle['messageContent'] = resp.error;
      this.showMessageBoxBundle['msgClass'] = 'blocker';
    }
    return this.showMessageBoxBundle;
  }

}
