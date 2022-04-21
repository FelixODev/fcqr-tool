import { Component, OnInit } from '@angular/core';
import { CopyService } from 'src/app/services/copy.service';

@Component({
  selector: 'app-enlarged-view',
  templateUrl: './enlarged-view.component.html',
  styleUrls: ['./enlarged-view.component.scss']
})
export class EnlargedViewComponent implements OnInit {

  props;
  ctrl;

  constructor(private copy: CopyService) { }

  ngOnInit() {}

  close() {
    this.ctrl.dismiss();
  }

  async copyText(p){
    await this.copy.toClipboard(p)
  }

}
