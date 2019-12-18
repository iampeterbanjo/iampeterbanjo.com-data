import utils from '../utils';
import Scheduler from './Scheduler';
import * as controller from './controller';

const { time } = utils;

export default {
	name: 'schedule',
	version: '1.0.0',
	dependencies: {
		'hapi-hodor': '1.x.x',
	},
	register: async (server, { getDbConnection, Agenda }) => {
		const { uri } = await getDbConnection();

		server.app.scheduler = new Scheduler({
			server,
			Agenda,
			options: {
				db: { address: uri },
				processEvery: time.fifteenMinutes,
			},
		});

		controller.handleListJobsGet(server);
		controller.handleListJobsFailedGet(server);
		controller.handleStartJobPost(server);
	},
};
