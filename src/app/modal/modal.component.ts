import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  onClick(aTitle:string, aDescriptionHtml:string) {
    console.log("example on http://shlomiassaf.github.io/angular2-modal/#/home");
    this.modal.alert()
    .size('sm')
    .isBlocking(true)
    .showClose(true)
    .keyboard(27)
    .title(aTitle)
    .body(aDescriptionHtml)
    .open();
  }
}
