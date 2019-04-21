import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-infopopup',
  templateUrl: './infopopup.component.html',
  styleUrls: ['./infopopup.component.scss']
})
export class InfopopupComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { 
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
  ngOnInit() {
  }

}
