import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../../app-shared/_service/reference.service';
import { ApiService } from 'app/app-shared/_service/api.service';
import {SettingsService} from '../_service/settings.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements OnInit {
  refServices: any;

  constructor(
    private settingService: SettingsService,
    private referenceService: ReferenceService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
   
  }

}
