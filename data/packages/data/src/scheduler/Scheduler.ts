import time from 'time';
import loadChartTopTracksProfile from '../pipe/loadChartTopTracksProfile';
import { Reporter } from '../services';

const report = new Reporter('Scheduler');

export default class Scheduler {
	public agenda;

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

		this.setupImportChartTopTracks();

		await this.agenda.start();
	}

	setupImportChartTopTracks = async () => {
		this.agenda.define('IMPORT_CHART_TRACKS', loadChartTopTracksProfile);

		await this.agenda.every(time.oneDay, 'IMPORT_CHART_TRACKS');
	};
}
