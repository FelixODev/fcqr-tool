import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-preview',
  templateUrl: './scan-preview.component.html',
  styleUrls: ['./scan-preview.component.scss'],
})
export class ScanPreviewComponent implements OnInit {

  props;
  func;
  ctrl;

  constructor() { }

  ngOnInit() {
    this.func(this.ctrl);
  }

  close() {
    this.ctrl.dismiss();
  }

}
