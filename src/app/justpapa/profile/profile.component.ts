import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_auth/auth.service';
import { UserService } from '../_service/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userPofile: any;

  constructor(private authService: AuthService, private userService: UserService, private translate: TranslateService) { }

  ngOnInit() {
    this.userPofile = this.userService.userBasicDetails[0];
  }

}
