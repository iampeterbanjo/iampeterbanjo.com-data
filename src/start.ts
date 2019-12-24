import { Reporter } from './services';
import api from './api';

const report = new Reporter('start');

(async () => {
	try {
		const server = await api();

		await server.start();
		await server.app.scheduler.init();

		report.log(`Data running at ${server.info.uri}`);
	} catch (error) {
		report.log(error, 'fatal');
		process.exit(1);
	}
})();
