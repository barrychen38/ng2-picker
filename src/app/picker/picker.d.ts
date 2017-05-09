import { EventEmitter, AfterViewInit, OnChanges } from '@angular/core';

export declare class BetterPickerComponent implements AfterViewInit, OnChanges {

	data: any[];
	show: boolean;
	selectIndex: number[];
	onSelect: EventEmitter<any>;
	onChange: EventEmitter<any>;

	ngAfterViewInit(): void;
	ngOnChanges(): void;

	pickerInit(): void;
	cancel(): void;
	confirm(): void;

}

export declare class BetterPickerModule {}