import { throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import * as R from 'ramda';

import { Database, IChartTrack, IChartRawTrack, getDbConnection } from 'models';

import { getChartTopTracks, request } from '../services';

const logCompleted = () => console.log('Complete');
const logError = error => console.error(error);
const logResult = result => console.log(result);

export const addImportedDate = (
	rawTopTracks: IChartRawTrack,
): IChartTrack[] => {
	const tracks = R.pathOr([], ['tracks', 'track'], rawTopTracks);

	if (!tracks || !tracks.length) {
		throw new Error('No tracks found');
	}

	return tracks.map(
		(track: IChartTrack): IChartTrack => {
			track.importedDate = new Date();
			return track;
		},
	);
};

export default async function loadChartTopTracksProfile() {
	const {} = await Database.init(getDbConnection);

	ajax(request({ url: getChartTopTracks }))
		.pipe(map(({ response }) => addImportedDate(response)))
		.subscribe(logResult, logError, logCompleted);
}
