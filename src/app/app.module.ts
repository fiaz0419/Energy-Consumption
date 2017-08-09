import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularEchartsModule } from 'ngx-echarts';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { dashboardComponent } from './components/dashboard/dashboard.component';
import { powerComponent } from './components/power/power.component';


@NgModule({
  declarations: [
    AppComponent,
    dashboardComponent,
    powerComponent
    
  ],
  imports: [
    BrowserModule,
    AngularEchartsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
