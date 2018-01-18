import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { View3DComponent } from './view3d/view3d.component';
import { View3dService } from './view3d/view3d.service';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { ControlPanelService } from './control-panel/control-panel.service';



@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    View3DComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [View3dService, HttpService, ControlPanelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
