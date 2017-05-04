import { EventEmitter, OnInit, AfterViewInit } from '@angular/core';

export declare class BetterPickerComponent implements OnInit, AfterViewInit {

	picker: any;
	inputWheelsData: any[];
	field: string;
	hide: EventEmitter<any>;
	sendSelected: EventEmitter<any>;

	ngOnInit(): void;
	ngAfterViewInit(): void;

	wheelsSelectorInit(): void;
	cancel(): void;
	confirm(): void;

}

export declare class BetterPickerModule {}