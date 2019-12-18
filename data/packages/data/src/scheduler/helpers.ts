import { Api } from '../types';

export default class Helpers {
	server: Api;

	constructor(server) {
		this.server = server;
	}

	async importChartTracks() {
		console.info(`Started: scheduled saveRawTopTracks at ${new Date()}`);

		try {
			await this.server.methods.pipeline.saveRawTopTracks(this.server);
			await this.server.methods.pipeline.convertRawTopTracks(this.server);
			await this.server.methods.pipeline.addSpotifyData(this.server);
			await this.server.methods.pipeline.addTrackProfile(this.server);
		} catch (error) {
			console.error(error);

			throw new Error(error);
		}
	}
}
