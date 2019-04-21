import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-infopopup',
  templateUrl: './infopopup.component.html',
  styleUrls: ['./infopopup.component.scss']
})
export class InfopopupComponent implements OnInit {
  @Input() content: string;
  @Input() popupTitle: string;
  loader = false;
  
  constructor(public activeModalService: NgbActiveModal) { }

  ngOnInit() {

  }

}
