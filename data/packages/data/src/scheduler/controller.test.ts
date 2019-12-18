import Hapi from '@hapi/hapi';
import * as controller from './controller';
import * as routes from './routes';
import { mockSchedulePlugin } from '../../factory';

const Server = async () => {
	const server = new Hapi.Server();

	await server.register(mockSchedulePlugin);

	return server;
};

describe('Given handleListJobs', () => {
	test('When GET /jobs `server.app.scheduler.agenda.jobs` is called', async () => {
		const server = await Server();
		jest.spyOn(server.app.scheduler.agenda, 'jobs');
		controller.handleListJobsGet(server);

		await server.inject({
			url: routes.get_jobs().url,
		});

		expect(server.app.scheduler.agenda.jobs).toHaveBeenCalled();
	});

	test('When GET /jobs `server.app.scheduler.agenda.jobs` is called', async () => {
		const server = await Server();
		jest.spyOn(server.app.scheduler.agenda, 'jobs');
		controller.handleListJobsFailedGet(server);

		await server.inject({
			url: routes.get_jobs_failed().url,
		});

		expect(server.app.scheduler.agenda.jobs).toHaveBeenCalled();
	});

	test('When POST /jobs/now/:name `server.app.scheduler.agenda.jobs` is called', async () => {
		const server = await Server();
		const jobName = 'IMPORT_CHART_TOP_TRACKS';
		jest.spyOn(server.app.scheduler.agenda, 'now');
		controller.handleStartJobPost(server);

		const { method, url } = routes.post_jobs_start();
		await server.inject({
			url: url.replace('{name}', jobName),
			method,
		});

		expect(server.app.scheduler.agenda.now).toHaveBeenCalledWith(jobName);
	});

	test('When POST /jobs/now/INVALID_JOB_NAME response is 422', async () => {
		const server = await Server();
		const jobName = 'INVALID_JOB_NAME';
		jest.spyOn(server.app.scheduler.agenda, 'now');
		controller.handleStartJobPost(server);

		const { method, url } = routes.post_jobs_start();
		const response = await server.inject({
			url: url.replace('{name}', jobName),
			method,
		});

		expect(response.statusCode).toEqual(422);
		expect(server.app.scheduler.agenda.now).not.toHaveBeenCalled();
	});
});
