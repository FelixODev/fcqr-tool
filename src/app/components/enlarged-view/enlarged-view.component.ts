import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enlarged-view',
  templateUrl: './enlarged-view.component.html',
  styleUrls: ['./enlarged-view.component.scss']
})
export class EnlargedViewComponent implements OnInit {

  props;
  ctrl;

  constructor() { }

  ngOnInit() {}

  close() {
    this.ctrl.dismiss();
  }

}
