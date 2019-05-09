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
export class HouseService {
  house: any;
  houseBasicDetails: any;

  constructor(
    private http: HttpClient, 
    private authapiService: AuthapiService,
    private userService: UserService
  ) { }

  setHouse(value: any) {
    this.house = '';
    this.house = value;
  }
  getHouse() {
    return this.house;
  }
  setHouseBasicDetails(value: any) {
    this.houseBasicDetails = value;
  }
  getHouseBasicDetails(){
    return this.houseBasicDetails;
  }
  
  getHouseDetailsByHouseId(houseId: any) {
    return this.http.get(API_URL + '/house/house-fetch/?action=byHouseId&houseId=' + houseId + '&pagenation=false')
    .map((resp: any) => {
      return resp;
    })
   // .catch(error => this.authapiService.handleError(error));
  }

}
