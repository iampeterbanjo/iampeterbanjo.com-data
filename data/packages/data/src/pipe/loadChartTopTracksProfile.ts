import { from, of, throwError } from 'rxjs';
import { XMLHttpRequest } from 'xmlhttprequest';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import * as R from 'ramda';
import { lastFmChartGetTopTracks } from '../services';

import { RequestParams } from '../types';
import { Database, IChartTrack, IChartRawTrack, getDbConnection } from 'models';

function createXHR() {
	return new XMLHttpRequest();
}

const logCompleted = () => console.log('Complete');
const logError = error => console.error(error);
const logResult = result => console.log(result);

const request = ({ url, method = 'GET' }: RequestParams) => ({
	url,
	createXHR,
});

export const addImportedDate = (
	rawTopTracks: IChartRawTrack,
): IChartTrack[] => {
	const tracks = R.pathOr([], ['tracks', 'track'], rawTopTracks);

	if (!tracks || !tracks.length) throw new Error('No tracks found');

	return tracks.map(
		(track: IChartTrack): IChartTrack => {
			track.importedDate = new Date();
			return track;
		},
	);
};

export default async function loadChartTopTracksProfile() {
	const {} = await Database.init(getDbConnection);

	ajax(request({ url: lastFmChartGetTopTracks }))
		.pipe(
			map(({ response }) => addImportedDate(response)),
			catchError(error => {
				console.error('error: ', error);
				return throwError(error);
			}),
		)
		.subscribe(logResult, logError, logCompleted);
}
