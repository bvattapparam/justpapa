import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userFullname: any;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userFullname = this.userService.userBasicDetails[0].firstName + ' ' + this.userService.userBasicDetails[0].lastName
    
  }

}
