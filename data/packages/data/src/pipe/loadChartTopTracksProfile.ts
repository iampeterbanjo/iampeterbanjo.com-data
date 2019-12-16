import { throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, tap } from 'rxjs/operators';
import * as R from 'ramda';
import Joi from '@hapi/joi';

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

export const validateChartTrack = (chartTrack: IChartTrack) => {
	const ChartTrackValidator = Joi.object({
		name: Joi.string(),
		duration: Joi.string(),
		playcount: Joi.string(),
		listeners: Joi.string(),
		url: Joi.string().uri(),
		artist: Joi.object(),
		image: Joi.array(),
	});

	return Joi.validate(chartTrack, ChartTrackValidator, {
		allowUnknown: true,
		presence: 'required',
	});
};

export const checkChartTracks = (tracks: IChartTrack[]) => {
	return tracks.map((track: IChartTrack) => {
		const { error } = validateChartTrack(track);
		if (error) {
			throw error;
		}

		return track;
	});
};

export default async function loadChartTopTracksProfile() {
	const {} = await Database.init(getDbConnection);

	ajax(request({ url: getChartTopTracks }))
		.pipe(map(({ response }) => addImportedDate(response)))
		.pipe(map(tracks => checkChartTracks(tracks)))
		.subscribe(logResult, logError, logCompleted);
}
