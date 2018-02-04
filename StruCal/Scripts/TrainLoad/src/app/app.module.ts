import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { View3DComponent } from './view3d/view3d.component';
import { View3dService } from './view3d/view3d.service';
import { HttpClientModule } from '@angular/common/http';
import { Drawing2dComponent } from './drawing2d/drawing2d.component';
import { ModalSection1Component } from './modal-section1/modal-section1.component';
import { ModalBaseComponent } from './modal-base/modal-base.component';
import { FormsModule } from '@angular/forms';
import { StructureService } from './services/structure.service';
import { HttpService } from './services/http.service';
import { ModalTrainLoadComponent } from './modal-train-load/modal-train-load.component';
import { InputComponent } from './input/input.component';
import { LocalStorageService } from './services/local-storage.service';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { ProgressDirective } from './status-bar/progress.directive';
import { StatusBarService } from './services/status-bar.service';
import { DetailsComponentComponent } from './details-component/details-component.component';
import { ModalSpanComponent } from './modal-span/modal-span.component';
import { ControlPanelService } from './services/control-panel.service';



@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    View3DComponent,
    Drawing2dComponent,
    ModalSection1Component,
    ModalBaseComponent,
    ModalTrainLoadComponent,
    InputComponent,
    ModalSpanComponent,
    StatusBarComponent,
    ProgressDirective,
    DetailsComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    View3dService,
    HttpService,
    ControlPanelService,
    StructureService,
    LocalStorageService,
    StatusBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
