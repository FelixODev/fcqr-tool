// npm install @ionic-native/core  @ionic-native/barcode-scanner phonegap-plugin-barcodescanner && ionic cap sync
// To use Html5QrcodeScanner (more info below)
import {Html5QrcodeScanner} from "html5-qrcode"

import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { DBService } from '../modules/fire/fire.service';
import { Observable } from "rxjs";
import { ScanPreviewComponent } from "../components/scan-preview/scan-preview.component";
import { EnlargedViewComponent } from "../components/enlarged-view/enlarged-view.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('content') private content: any;
  
  title = 'app';
  elementType = 'url';
  value = '';
  qrs: any = {codes:[{name:'Qr Codes', values:[]}]};
  itr: number = 0;
  editing: boolean = false;

  constructor(private route: ActivatedRoute,
  private alert: AlertController,
  private db: DBService,
  private modal: ModalController,
  private popover: PopoverController
  ) {}
  
  async ngOnInit() {
    const qrs = (await this.p(this.route.data))?.qr;
      // this.log(qrs);
      // this.log(this.qrs);
    if(qrs?.codes) {
      // this.value = qr?.code||qr;
      this.qrs = qrs;
    }
  }

  async aud(i?:any, value?:string) {

    let del:boolean;
    const b_i = i>=0;

    const ud = [{
        text: "Cancel",
        role: "cancel"
      },{
        text: "Delete",
        handler: () => {
          this.qrs.codes[this.itr].values.splice(i,1);
          del = true;
        }
      },{
        text: "Save",
        handler: (e: any) => {
          return e
        }
      }
    ];

    const add = [{
      text: "Cancel",
      role: "cancel"
    },{
      text: 'Save',
      handler: (e: any) => {
        return e
      }
    }];

    const bs = ((b_i)?ud:add);

    const a = await this.alert.create({
      message: 'Input value to encode',
      cssClass: 'custom-alert',
      inputs:[{
        type: 'text',
        value: value||''
      }],
      buttons: bs
    });
    
    await a.present();
    
    const res = await a.onDidDismiss();
    const v = (res?.data)[0];

    // this.log(del);
    // this.log(this.qrs);

    if(del!==true && v?.length > 0){
      const text = this.sanatize(v);

      if(b_i)
        this.qrs.codes[this.itr].values[i]=text;
      else 
        this.qrs.codes[this.itr].values.push(text);
    }
  }










  switch(itr: number) {
    this.itr = itr;
  }

  async deleteList(i: any) {

    let del:boolean;

    const a = await this.alert.create({
      message: 'Delete this code list?',
      buttons: [{
          text: "Cancel",
          role: "cancel"
        },{
          text: "Delete",
          handler: () => {
            del = true;
            return true
          }
        }
      ]
    });
    
    await a.present();

    const res = await a.onDidDismiss();
    const v = (res?.data)[0];

    if(del===true)
      if(this.itr>0) {
        this.qrs.codes.splice(i,1);
        this.itr-=1;
      } else {
        this.qrs.codes.shift();
        this.itr=0;
      }

  }

  async enlarge(qr) {
    await this.popup({
      c: EnlargedViewComponent,
      type: 'popover',
      props: {val: qr},
      css: 'pop-stretch'
    });
  }









  async scan() {
    const success = await this.popup({
      c: ScanPreviewComponent,
      func: this.decode
    });

    if(success === true)
    this.content.scrollToBottom(300);
  }

  decode = (ctrl)=> {

    let qrs = this.qrs.codes[this.itr].values;

    function onScanSuccess(decodedText: any, decodedResult?: any) {
      // handle the scanned code as you like, for example:
      // console.log(`Code matched = ${decodedText}${decodedResult}`);
      qrs.push(decodedText);
      html5QrcodeScanner.clear();
      ctrl.dismiss(true);
    }
    
    function onScanFailure(error: any) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.log(`Code scan error = ${error}`);
    }
    
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader", { 
        fps: 15, 
        qrbox: {width: 250, height: 250},
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        } 
      }, /* verbose= */ false
    );

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return html5QrcodeScanner
  }

  push() {
    this.qrs.codes.push({name: 'Qr Codes', values: []});
    this.itr=this.qrs.codes.length-1;
  }

  async save(qrs: { id: any; }) {
    const id = qrs?.id||this.db.doc.createId();
    await this.db.doc.update({
      c: 'qrs', d: id,
      set: qrs
    });
    // this.log(id);
    window.localStorage.setItem('id', id);
  }










  sanatize(value: any) {
    let text = value
    .replaceAll(/dash/ig, ' - ')
    .replaceAll(/underscore/ig, ' _ ')
    .replaceAll(/colon/ig, ' : ')
    // .split('-').join(' - ')
    // .split('_').join(' _ ')
    // .split(':').join(' : ')
    .replaceAll(/\bone\b/ig, '1')
    .replaceAll(/\b(two|to)\b/ig, '2')
    .replaceAll(/\bthree\b/ig, '3')
    .replaceAll(/\b(four|for)\b/ig, '4')
    .replaceAll(/\bbee\b/ig, 'b')
    .replaceAll(/\b(see|sea)\b/ig, 'c')
    .replaceAll(/\beye\b/ig, 'i')
    .replaceAll(/\b(pee|pea)\b/ig, 'p')
    .replaceAll(/\bwhy\b/ig, 'y');
    

    if(text.match(/^\D*(\d\D*){11,15}$/)){
      text = text.replaceAll('-'||'.'||'('||')', '');
    }

    if(text[1]=='-'||'_'||'a' || text[0]==/p/ig){
      text = text.toUpperCase().replaceAll('.','');
    }

    text = text.replaceAll(/\s/g, '');
    text = text.replace(/\bzone/ig, 'zone ');
    text = text.replaceAll(/space/ig, ' ');

    return text
  }

  async p(stream: Observable<Data>){
    return await stream.pipe(take(1)).toPromise()
  }

  async popup (p) {
    const ct = (p?.type!='pop'||'popover')?this.modal:this.popover;
    const pop = await ct.create({
      component: p?.c||p?.component,
      componentProps: {
        func: p?.func,
        props: p?.p||p?.props,
        ctrl: ct
      },
      cssClass: p?.css||''
    });

    await pop.present();
    const res = await pop.onDidDismiss();
    return res.data
  }

  log(p: any) {
    console.log(p);
    alert(JSON.stringify(p));
  }
}



// const a = await this.alert.create({
//   header: 'Close scanner?',
//   buttons: [
//     {
//       text: 'Yes', handler: ()=> {
//         html5QrcodeScanner = null;
//       },
//     },
//     {
//       text: "No", role: 'cancel'
//     }
//   ]
// });