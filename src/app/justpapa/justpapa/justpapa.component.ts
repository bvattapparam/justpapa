import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-justpapa',
  templateUrl: './justpapa.component.html',
  styleUrls: ['./justpapa.component.scss']
})
export class JustpapaComponent implements OnInit {
amount = '450.90';
  constructor(private translate: TranslateService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadScript('assets/vendors/js/vendor.bundle.base.js');
    this.loadScript('assets/vendors/js/vendor.bundle.addons.js');

    this.loadScript('assets/js/off-canvas.js');
    this.loadScript('assets/js/hoverable-collapse.js');
    this.loadScript('assets/js/template.js');
    this.loadScript('assets/js/settings.js');
    this.loadScript('assets/js/todolist.js');
    this.loadScript('assets/js/alerts.js');
    this.loadScript('assets/js/chart.js');
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');

    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
