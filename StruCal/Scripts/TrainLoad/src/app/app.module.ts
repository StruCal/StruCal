import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { View3DComponent } from './view3d/view3d.component';
import { View3dService } from './view3d/view3d.service';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { ControlPanelService } from './control-panel/control-panel.service';
import { Drawing2dComponent } from './drawing2d/drawing2d.component';
import { ModalSection1Component } from './modal-section1/modal-section1.component';



@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    View3DComponent,
    Drawing2dComponent,
    ModalSection1Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [View3dService, HttpService, ControlPanelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
