import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfopopupComponent } from '../_modal/infopopup/infopopup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private translate: TranslateService, private modalService: NgbModal) { }

  showPopup(content, header){
    const modalRef = this.modalService.open (InfopopupComponent, {size:'lg', centered: true});
    modalRef.componentInstance.loader = true;
    modalRef.componentInstance.popuptitle = 'Sample title';
    modalRef.componentInstance.content = content;
  }
  
  ngOnInit() {
    
  }

}
