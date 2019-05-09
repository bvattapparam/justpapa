import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-house-basic-details',
  templateUrl: './house-basic-details.component.html',
  styleUrls: ['./house-basic-details.component.scss']
})
export class HouseBasicDetailsComponent implements OnInit {
@Input() basicDetails: any;
  constructor() { }

  ngOnInit() {
  }

}
