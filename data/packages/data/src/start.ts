import Fastify from 'fastify';
import { DATA_PORT } from './env';

const fastify = Fastify({ logger: true });
fastify.get('/', async (request, reply) => {
	return { hello: 'world' };
});

(async () => {
	try {
		await fastify.listen(DATA_PORT);

		const port = fastify.server.address() || '';
		fastify.log.info(`data listening on ${port}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
})();
