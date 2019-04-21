import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateService} from '@ngx-translate/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfopopupComponent } from '../_modal/infopopup/infopopup.component';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private translate: TranslateService, private modalService: NgbModal) { }

  ngOnInit() {
    console.log('reached forgot password!')
  }

  showPopup(content, header){
    const modalRef = this.modalService.open (InfopopupComponent, {size: 'lg', windowClass: 'custom-class-md', centered: false});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = 'Sample title';
    modalRef.componentInstance.content = content;
  }

}
