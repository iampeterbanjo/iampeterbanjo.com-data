import time from 'time';

import Scheduler from './Scheduler';
import * as controller from './controller';

export default {
	name: 'schedule',
	version: '1.0.0',
	dependencies: {
		'hapi-hodor': '1.x.x',
	},
	register: async (server, { getDbConnection, Agenda }) => {
		const { uri } = await getDbConnection();

		server.app.scheduler = new Scheduler({
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
