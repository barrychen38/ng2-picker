import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BetterPickerComponent } from './picker.component';

@NgModule({
	imports: [ CommonModule ],
	exports: [ BetterPickerComponent ],
	declarations: [ BetterPickerComponent ]
})

export class PickerModule { }