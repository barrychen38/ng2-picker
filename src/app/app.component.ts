import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

import { SendData } from './picker/picker';

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
				'Apple',
				'Microsoft',
				'Google',
				'Facebook',
				'Airbnb'
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

	private type: number;

	constructor(
		private http: Http
	) {
		this.parentData = this.initData.brands;
		// store locations data
		this.getData('location.json').subscribe((locations) => {
			this.locationData = locations;
			this.buildLocationData(this.locationData);
		}, (error) => {
			console.error(error);
		});
		// store movies data
		this.getData('movie.json').subscribe((movies) => {
			this.movieData = movies;
			this.buildMovieData(this.movieData);
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
	}

	/**
	 * build location data to fit the picker
	 */
	buildLocationData(location: any) {
		this.initData.locations[0] = Object.keys(location);
		let firstProvince: string = this.initData.locations[0][0];
		this.initData.locations[1] = Object.keys(location[firstProvince]);
		let firstCity: string = this.initData.locations[1][0];
		this.initData.locations[2] = location[firstCity][firstCity];
	}

	/**
	 * build movie data to fit the picker
	 */
	buildMovieData(movie: any) {
		this.initData.movies[0] = Object.keys(movie);
		let firstCompany: string = this.initData.movies[0][0];
		this.initData.movies[1] = movie[firstCompany];
	}

	/**
	 * get data from local
	 */
	getData(url: string) {
		return this.http.get('/assets/mock-data/' + url)
			.map((res: Response) => {
				return res.json();
			});
	}

}
