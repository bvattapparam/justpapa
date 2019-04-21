import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_auth/auth.service'
import { EventsService } from '../../_service/events.service'
import { ReferenceService } from '../../../app-shared/_service/reference.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  listofEvents: any;
  constructor(
    private authService: AuthService,
    private eventService: EventsService,
    private referenceService: ReferenceService
    ) { }

  ngOnInit() {
   const refService = this.referenceService.getPublicParam();
   if(typeof refService === 'undefined'){
    this.authService.logout();
   }
  }
  logoutCall(){
    window.location.href = environment.logout_URL;
    window.location.reload();
   // this.authService.logout();
  }

}
