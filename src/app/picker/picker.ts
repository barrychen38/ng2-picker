// Import from Angular
import {
	NgModule,
	Component,
	Input,
	Output,
	OnChanges,
	OnInit,
	AfterViewInit,
	EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
// Import library
import { Picker } from '../../vendor/better-picker/picker';

/* ---------------- define component and export ---------------- */
@Component({
	selector: 'better-picker',
	templateUrl: './picker.template.html',
	styleUrls: ['./picker.style.scss']
})

export class BetterPickerComponent implements AfterViewInit, OnChanges {

	@Input() private inputWheelsData: any[];
	@Input() private field: string;
	@Input() private show: boolean;

	@Output() private hide: EventEmitter<any> = new EventEmitter<any>();
	@Output() private sendSelected: EventEmitter<any> = new EventEmitter<any>();

	private picker: any;
	private selectedIndex: number[] = [0];

	/**
	 * make sure all datas and view rendered to init the wheels selector
	 */
	ngAfterViewInit() {
		if (this.inputWheelsData.length) {
			this.wheelsSelectorInit();
		}
	}
	
	/**
	 * detect the change of inputWheelsData
	 */
	ngOnChanges(value: any) {
		if (value.show.currentValue) {
			setTimeout(() => {
				this.picker.refresh(this.inputWheelsData, this.selectedIndex);
			}, 0);
		}
	}

	/**
	 * initialize wheels selector
	 */
	wheelsSelectorInit() {
		this.picker = new Picker({
			container: 'picker-any',
			data: this.inputWheelsData,
			selectedIndex: [0]
		});
		// picker select event
		this.picker.on('picker.select', (selectedValue: string[], selectedIndex: number[]) => {
			this.hide.emit({
				action: 'confirm',
				show: false,
				selectedValue
			});
		});
		// picker change event
		this.picker.on('picker.change', (wheel: number, index: number) => {
			this.sendSelected.emit({
				wheel,
				index
			});
		});
	}

	/**
	 * cancel select no trigger event
	 */
	cancel() {
		this.picker.hide(() => {
			this.hide.emit({
				action: 'cancel',
				show: false,
				selectedValue: this.picker.selectedVal
			});
		});
	}

	/**
	 * confirm select trigger picker.select event
	 */
	confirm() {
		this.picker.confirm();
	}

}

/* ---------------- define module and export ---------------- */
@NgModule({
	imports: [ CommonModule ],
	exports: [ BetterPickerComponent ],
	declarations: [ BetterPickerComponent ]
})

export class PickerModule { }