declare let require;

import { Component } from '@angular/core';

let Picker = require('../../vendor/picker.min.js');

@Component({
	selector: 'better-picker',
	templateUrl: './picker.template.html',
	styleUrls: ['./picker.style.scss']
})

export class BetterPickerComponent {

	constructor() { }

}