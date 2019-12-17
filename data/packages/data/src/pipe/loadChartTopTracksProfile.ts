import { ajax } from 'rxjs/ajax';
import { map, tap } from 'rxjs/operators';
import * as R from 'ramda';
import Joi from '@hapi/joi';

import { Database, IChartTrack, IChartRawTrack, getDbConnection } from 'models';

import { getChartTopTracks, request, Reporter } from '../services';

const report = new Reporter('loadChartTopTracksProfile');

const logError = (error: string) => report.log(error, 'error');
const logInfo = (message: string) => report.log(message);

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
	const { connection } = await Database.init(getDbConnection);

	await ajax(request({ url: getChartTopTracks }))
		.pipe(map(({ response }) => addImportedDate(response)))
		.pipe(
			tap(() => logInfo('validating tracks')),
			map(tracks => checkChartTracks(tracks)),
		)
		.subscribe(null, logError, () => logInfo('complete'));

	connection.close();
}
