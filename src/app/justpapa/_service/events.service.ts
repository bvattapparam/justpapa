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

const API_URL = environment.API_URL;

@Injectable()
export class EventsService {

  constructor( private http: HttpClient) { }

  getEvents() {
    return this.http.get(API_URL + '/eventmanager/active-events/')
    .map((resp: any) => {
      return resp;
    })
  }
}
