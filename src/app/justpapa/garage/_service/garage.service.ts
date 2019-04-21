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
export class GarageService {
  vehicles: any;
  
  constructor(
    private http: HttpClient, 
    private authapiService: AuthapiService,
    private userService: UserService
  ) { }

  getVehicles() {
    return this.http.get(API_URL + '/garage/vehicle-fetch/?action=fullview')
    .map((resp: any) => {
      return resp;
    })
    .catch((error: any) => {
      this.authapiService.handleError(error, 'secure');
      return Observable.throw(error);
    })
     .finally(()=> this.onEnd());
  }
  getVehiclesByvehiclId(vehicleId: any) {
    return this.http.get(API_URL + '/garage/vehicle-fetch/?action=byvehicleId&vehicleId=' + vehicleId + '&pagenation=false')
    .map((resp: any) => {
      return resp;
    })
    .catch((error: any) => {
      this.authapiService.handleError(error, 'secure');
      return Observable.throw(error);
    })
     .finally(()=> this.onEnd());
  }
  addVehicle(formvalues: any) {
    formvalues['modifiedBy'] = this.userService.userBasicDetails[0].userName;
    const payload = formvalues;
     return this.http.post(API_URL + '/garage/vehicle-add/', payload, httpOptions)
     .map((resp: any) => {
       return resp;
     })
     .catch((error: any) => {
      this.authapiService.handleError(error, 'secure');
      return Observable.throw(error);
    })
     .finally(()=> this.onEnd());
  }
  updateVehicle(formvalues: any) {
    formvalues['modifiedBy'] = this.userService.userBasicDetails[0].userName;
    const payload = formvalues;
     return this.http.post(API_URL + '/garage/vehicle-update/', payload, httpOptions)
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
