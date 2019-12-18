import * as routes from './routes';
import Boom from 'boom';

export const handleListJobsGet = server => {
	const { method, url } = routes.get_jobs();

	return server.route({
		method,
		path: url,
		config: {
			auth: 'jwt',
		},
		handler: async () => {
			return server.app.scheduler.agenda.jobs({}, { lastRunAt: -1 });
		},
	});
};

export const handleListJobsFailedGet = server => {
	const { method, url } = routes.get_jobs_failed();

	return server.route({
		method,
		path: url,
		config: {
			auth: 'jwt',
		},
		handler: async () => {
			return server.app.scheduler.agenda.jobs(
				{
					failReason: { $exists: true },
				},
				{ failedAt: -1 },
			);
		},
	});
};

export const handleStartJobPost = server => {
	const { method, url } = routes.post_jobs_start();

	return server.route({
		method,
		path: url,
		config: {
			auth: 'jwt',
		},
		handler: async request => {
			const { name } = request.params;
			if (!server.app.scheduler.routines.has(name)) {
				return Boom.badData(`${name} job does not exist`);
			}
			return server.app.scheduler.agenda.now(request.params.name);
		},
	});
};
