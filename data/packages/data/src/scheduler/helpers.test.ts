import Hapi from '@hapi/hapi';

import plugin from './plugin';
import Helpers from './helpers';

import securityPlugin from '../security';
import { Api } from '../types';
import { getDbConnection, disconnectAndStopDb } from '../../factory';
import topTracksJson from '../../fixtures/lastfm-topTracks.json';
import {
	mockModelPlugin,
	mockKorinPlugin,
	mockPipelinePlugin,
} from '../../factory';
import Agenda from 'agenda';

jest.mock('agenda', () => {
	return jest.fn().mockImplementation(() => {
		return {
			start: jest.fn(),
			define: jest.fn(),
			every: jest.fn(),
			now: jest.fn(),
			on: jest.fn(),
		};
	});
});

const Server = async () => {
	const server = Hapi.Server({ debug: { request: ['error'] } });

	await server.register(securityPlugin);
	await server.register(mockModelPlugin);
	await server.register(mockKorinPlugin);
	await server.register(mockPipelinePlugin);

	await server.register({
		plugin,
		options: { getDbConnection, Agenda },
	});

	return server;
};

let server: Api;

beforeAll(async () => {
	server = await Server();
});

afterAll(async () => {
	await disconnectAndStopDb();
});

describe('Given importChartTracks', () => {
	test('When called it should use saveRawTopTracks, convertRawTopTracks, addSpotifyData, addTrackProfile', async () => {
		const helpers = new Helpers(server);
		jest.spyOn(server.methods.pipeline, 'saveRawTopTracks');
		jest.spyOn(server.methods.pipeline, 'convertRawTopTracks');
		jest.spyOn(server.methods.pipeline, 'addSpotifyData');
		jest.spyOn(server.methods.pipeline, 'addTrackProfile');

		await helpers.importChartTracks();

		expect(server.methods.pipeline.saveRawTopTracks).toHaveBeenCalled();
		expect(server.methods.pipeline.convertRawTopTracks).toHaveBeenCalled();
		expect(server.methods.pipeline.addSpotifyData).toHaveBeenCalled();
		expect(server.methods.pipeline.addTrackProfile).toHaveBeenCalled();
	});
});
