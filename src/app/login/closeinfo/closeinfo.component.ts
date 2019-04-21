import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateService} from '@ngx-translate/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfopopupComponent } from '../_modal/infopopup/infopopup.component';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-closeinfo',
  templateUrl: './closeinfo.component.html',
  styleUrls: ['./closeinfo.component.scss']
})
export class CloseinfoComponent implements OnInit {

  constructor(private translate: TranslateService, private _router: Router, private modalService: NgbModal) { }

  loginagain() {
    this._router.navigate([environment.login_URL]);
  }
  ngOnInit() {
  }

}
