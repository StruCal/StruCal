import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { View3DComponent } from './view3d/view3d.component';
import { Canvas3dDirective } from './view3d/canvas3d.directive';
import { View3dService } from './view3d/view3d.service';


@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    View3DComponent,
    Canvas3dDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [View3dService],
  bootstrap: [AppComponent]
})
export class AppModule { }
