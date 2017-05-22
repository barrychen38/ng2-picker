// Import from Angular
import { EventEmitter, AfterViewInit, OnChanges } from '@angular/core';

export declare class BetterPickerComponent implements AfterViewInit, OnChanges {
	
	// Input
	data: any[];
	show: boolean;
	selectIndex: number[];
	// Output
	onSelect: EventEmitter<any>;
	onChange: EventEmitter<any>;
	
	// Picker
	picker: any;
	
	// Angular events
	ngAfterViewInit(): void;
	ngOnChanges(): void;
	
	// Picker init function
	pickerInit(): void;
	
	// Picker events
	cancel(): void;
	confirm(): void;

}

export declare class BetterPickerModule {}