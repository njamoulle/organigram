import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  @ViewChild(ModalComponent) modalComponent: ModalComponent
  title = 'app works!';

  constructor(){
    
  }

  ngAfterViewInit(){
    console.log(this.modalComponent);
    
  }

  onClick(){
    this.modalComponent.onClick("test1", "<p>qwerty</p><p>qwerty2</p>");
  }
}
