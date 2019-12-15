import { from, of, throwError } from 'rxjs';
import { XMLHttpRequest } from 'xmlhttprequest';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';

import { lastFmChartGetTopTracks } from './services';

function createXHR() {
	return new XMLHttpRequest();
}

const handleCompleted = () => console.log('Complete');
const handleError = response => console.error(response);
const handleSuccess = response => console.log(response);

type RequestParams = {
	url: string;
	method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
};

const request = ({ url, method = 'GET' }: RequestParams) => ({
	url,
	createXHR,
});

ajax(request({ url: lastFmChartGetTopTracks }))
	.pipe(
		map(chartTopTracks => console.log(chartTopTracks)),
		catchError(error => {
			console.error('error: ', error);
			return throwError(error);
		}),
	)
	.subscribe(handleSuccess, handleError, handleCompleted);
