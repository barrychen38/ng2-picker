// Import from Angular
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
// Import library
import { SendData } from './picker/picker';
// Import RxJS
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.template.html',
  styleUrls: ['./app.style.scss']
})

export class AppComponent {
	// original data
	private movieData: any;
	private locationData: any;
	private initData: any = {
		brands: [
			[
				'',
				'NIKE',
				'ADIDAS',
				'UNDER ARMOUR'
			]
		],
		movies: [[], []],
		locations: [[], [], []]
	};
	// output data
	private parentData: any[];
	private selectIndex: number[] = [0, 0, 0];
	private showPicker: boolean;
	// show data
	private selectedBrand: string;
	private selectedMovie: string;
	private selectedArea: string;

	private firstCheck: number = 0;

	private type: number;

	constructor(
		private http: Http
	) {
		this.parentData = this.initData.brands;
		// store locations data
		this.getData('location.json').subscribe((locations) => {
			this.locationData = locations;
			this.initData.locations = this.buildData(this.locationData);
		}, (error) => {
			console.error(error);
		});
		// store movies data
		this.getData('movie.json').subscribe((movies) => {
			this.movieData = movies;
			this.initData.movies = this.buildData(this.movieData);
		}, (error) => {
			console.error(error);
		});
	}

	/**
	 * active picker to show
	 */
	activePicker(type: number) {
		this.type = type;
		switch (type) {
			case 1:
				this.parentData = this.initData.brands;
				break;
			case 2:
				this.parentData = this.initData.movies;
				break;
			case 3:
				this.parentData = this.initData.locations;
				break;
			default:
				break;
		}
		this.showPicker = true;
	}

	/**
	 * select event of picker's value and index
	 */
	onSelect(value: SendData) {
		let { action, show, selectedValue, selectedIndex } = value;
		console.log(`action: ${action}, selectedValue: ${selectedValue}, selectedIndex: ${selectedIndex}`);

		this.showPicker = show;
		
		if (action === 'cancel') {
			return;
		}

		switch (this.type) {
			case 1:
				this.selectedBrand = selectedValue.join(' - ');
				break;
			case 2:
				this.selectedMovie = selectedValue.join(' - ');
				break;
			case 3:
				this.selectedArea = selectedValue.join(' - ');
				break;
			default:
				break;
		}
		
	}

	/**
	 * change event of picker's wheel and index
	 */
	onChange(value: any) {
		let { wheel, index } = value;
		console.log(`wheel: ${wheel}, index: ${index}`);

		if (this.type === 2) {
			this.changeConnectData(this.movieData, this.initData.movies, wheel, index);
		}
		if (this.type === 3) {
			this.changeConnectData(this.locationData, this.initData.locations, wheel, index);
		}
		
	}

	/**
	 * change connected data
	 */
	changeConnectData(data: any, initData: any[], wheel: number, index: number) {
		if (!initData[wheel + 1]) {
			return;
		}
		if (wheel === 0) {
			this.firstCheck = index;
		}
		let firstData: any = data[initData[0][this.firstCheck]];
		let secondIndex: number = index;
		if (firstData instanceof Array) {
			initData[1] = firstData;
			this.parentData = initData;
			return;
		}
		if (wheel !== 1) {
			initData[1] = Object.keys(firstData);
			secondIndex = 0;
		}
		let secondData: any = data[initData[0][this.firstCheck]][initData[1][secondIndex]];
		initData[2] = secondData;
		this.parentData = initData;
	}

	/**
	 * build data to fit the picker
	 */
	buildData(data: any): any[] {
		let initData: any[] = [];
		let dataLength: number = this.getDataLength(data);
		if (dataLength === 1) {
			initData.push(data);
			return initData;
		}
		let firstData: any[] = [];
		let circleData: any = data;
		for (let i = 0; i < dataLength; i++) {
			if (circleData instanceof Array) {
				initData[i] = circleData;
				break;
			}
			initData[i] = Object.keys(circleData);
			firstData[i] = initData[i][0];
			circleData = circleData[firstData[i]];
		}
		return initData;
	}

	/**
	 * get data length of Object, only to 3
	 */
	 getDataLength(data: any): number {
		if (data instanceof Array) {
			return 1;
		}
		if (data instanceof Object) {
			let firstLayer: any[] = Object.keys(data);
			let firstLayerData: any = data[firstLayer[0]];
			if (firstLayerData instanceof Array) {
				return 2;
			}
			let secondLayer: any[] = Object.keys(firstLayerData);
			let secondLayerData: any = data[firstLayer[0]][secondLayer[0]];
			if (secondLayerData instanceof Array) {
				return 3;
			}
		}
	 }

	/**
	 * get data from local
	 */
	getData(url: string) {
		return this.http.get(`assets/mock-data/${url}`)
			.map((res: Response) => {
				return res.json();
			});
	}

}
