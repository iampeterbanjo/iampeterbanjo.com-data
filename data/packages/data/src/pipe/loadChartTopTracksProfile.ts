import { from, of, throwError } from 'rxjs';
import { XMLHttpRequest } from 'xmlhttprequest';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

import { lastFmChartGetTopTracks } from '../services';

import { RequestParams } from '../types';
function createXHR() {
	return new XMLHttpRequest();
}

const logCompleted = () => console.log('Complete');
const logError = response => console.error(response);
const logResponse = response => console.log(response);

const request = ({ url, method = 'GET' }: RequestParams) => ({
	url,
	createXHR,
});

export default function loadChartTopTracksProfile() {
	ajax(request({ url: lastFmChartGetTopTracks }))
		.pipe(
			map(chartTopTracks => console.log('chartTopTracks', chartTopTracks)),
			catchError(error => {
				console.error('error: ', error);
				return throwError(error);
			}),
		)
		.subscribe(null, logError, logCompleted);
}
