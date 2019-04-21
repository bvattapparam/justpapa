import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ReferenceService } from './reference.service';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfopopupComponent } from '../_modal/infopopup/infopopup.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw'
import { of } from 'rxjs/observable/of';
import { TranslateService } from '@ngx-translate/core';

const APLI_URL = environment.API_URL;

@Injectable()
export class ApiService {
  public appDefaultReferences: any;
  public publicParam: any;
  defaultReferences: any;

  constructor(
    private http: HttpClient,
    private referenceService: ReferenceService,
    private modalService: NgbModal,
    private translateService: TranslateService
    ) { }

   setDefaultParam() {
    if (this.publicParam) {
      return of({resp: this.publicParam});
    } else {
      return this.http.get(APLI_URL + '/references/get/')
      .map((resp: any) => {
        this.publicParam = resp;
        this.referenceService.setPublicParam(this.publicParam);
        return resp;
      })
       .catch(err => this.backToLogin());
    }
  }
  backToLogin(): any{
    const modalRef = this.modalService.open(InfopopupComponent, {centered: false});
    modalRef.componentInstance.popupTitle = this.translateService.instant('errortitle.serviceerror');
    modalRef.componentInstance.content = this.translateService.instant('message.serviceerror');
    // return modalRef.result.then(resp => {
    //  window.location.href = environment.login_urlcu;
    // })
  }
}
