import Fastify from 'fastify';

const fastify = Fastify({ logger: true });
fastify.get('/', async (request, reply) => {
	return { hello: 'world' };
});

(async () => {
	try {
		await fastify.listen(3000);

		const port = fastify.server.address() || '';
		fastify.log.info(`data listening on ${port}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
})();
