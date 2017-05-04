import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.template.html',
  styleUrls: ['./app.style.css']
})

export class AppComponent {
	
	private parnetData: any[] = [
		[
			'Apple',
			'Microsoft',
			'Google',
			'Facebook',
			'Airbnb'
		]
	];

	private receiveInfo: any;
	private showPicker: boolean;
	private selectedValue: string;

	activeWheels() {
		this.showPicker = true;
	}

	hidePicker(value: any) {
		let { action } = value;

		this.showPicker = value.show;
		
		if (action === 'cancel') {
			return;
		}

		this.selectedValue = value.selectedValue.join('');
		
	}

	receiveSelected(wheelSelected: any) {
		
	}

}
