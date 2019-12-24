import time from 'time';
import loadChartTopTracksProfile from '../pipe/loadChartTopTracksProfile';
import { Reporter } from '../services';

const report = new Reporter('Scheduler');

export default class Scheduler {
	public agenda;
	public routines = new Map();

	constructor({ Agenda, options }) {
		this.agenda = new Agenda(options);
	}

	async init() {
		this.agenda.on('success', ({ attrs }) =>
			report.log(`SUCCESS: ${attrs.name}`),
		);
		this.agenda.on('fail', ({ attrs }) =>
			report.log(`ERROR: ${attrs.name}`, 'error'),
		);

		await this.agenda.start();
		await this.setupImportChartTopTracks();
	}

	setupImportChartTopTracks = async () => {
		const id = 'IMPORT_CHART_TRACKS';

		this.routines.set(id, {
			id,
			description: 'Import LastFm chart top tracks',
		});
		this.agenda.define(id, loadChartTopTracksProfile);

		await this.agenda.every(time.oneDay, id);
	};
}
