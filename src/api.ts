import Hapi from '@hapi/hapi';

import { Reporter } from './services';
import schedule from './scheduler';
import security from './security';

import { DATA_PORT } from '@iampeterbanjo/env';

const report = new Reporter('api');

console.log(`DATA_PORT: ${DATA_PORT}`);

export default async function main() {
	try {
		const server = Hapi.Server({
			host: '0.0.0.0',
			port: Number(DATA_PORT),
			routes: {
				files: {
					relativeTo: __dirname,
				},
			},
			router: {
				stripTrailingSlash: true,
			},
			debug: {
				request: ['*'],
			},
		});

		await Promise.all([
			server.register(security),
			server.register(schedule),
			//
		]);

		return server;
	} catch (error) {
		report.log(error, 'fatal');
	}
}
