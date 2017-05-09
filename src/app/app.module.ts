import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { BetterPickerModule } from './picker/picker';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
		FormsModule,
		BetterPickerModule
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
