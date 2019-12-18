import { ajax } from 'rxjs/ajax';
import { map, tap, concatMap } from 'rxjs/operators';
import * as R from 'ramda';
import Joi from '@hapi/joi';

import {
	Database,
	IChartTrack,
	IChartRawTrack,
	IChartTrackModel,
	getDbConnection,
} from 'models';

import { getChartTopTracks, request, Reporter } from '../services';

const report = new Reporter('loadChartTopTracksProfile');

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

export const saveChartTracks = async (
	tracks: IChartTrack[],
	ChartTrackModel: IChartTrackModel,
): Promise<IChartTrack[]> => {
	await ChartTrackModel.deleteMany({});
	await ChartTrackModel.insertMany(tracks);

	return tracks;
};

export default async function loadChartTopTracksProfile() {
	const { connection, uri, ChartTrackModel } = await Database.init(
		getDbConnection,
	);
	const { modelName } = ChartTrackModel;

	report.log(`connected to ${uri}`);
	await ajax(request({ url: getChartTopTracks }))
		.pipe(
			tap(() => report.log(`lastFm response`)),
			map(({ response }) => addImportedDate(response)),
		)
		.pipe(
			tap(() => report.log('validating')),
			map(tracks => checkChartTracks(tracks)),
		)
		.pipe(
			tap(() => report.log(`saving ${modelName}`)),
			concatMap(async tracks => await saveChartTracks(tracks, ChartTrackModel)),
		)
		.subscribe({
			complete: () => {
				connection.close();
				report.log('complete');
			},
			error: error => report.log(error, 'error'),
		});
}
