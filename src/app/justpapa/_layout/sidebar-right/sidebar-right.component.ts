import { Component, OnInit } from '@angular/core';
import { EventsService } from 'app/justpapa/_service/events.service';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent implements OnInit {
  listofEvents: any;
  constructor(private eventService: EventsService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    this.eventService.getEvents()
    .subscribe((resp: any) => {
      this.listofEvents= resp;
    }, (err)=> {
      console.log('error events')
    });
  }


}
