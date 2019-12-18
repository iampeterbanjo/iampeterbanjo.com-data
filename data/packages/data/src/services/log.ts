import pino from 'pino';

interface ILogger {
	[key: string]: (message: string) => void;
}

export class Reporter {
	prefix;
	logger;

	constructor(prefix: string, logger?: Partial<ILogger>) {
		this.prefix = prefix;
		this.logger =
			logger ||
			pino({
				prettyPrint: {
					levelFirst: true,
				},
			});
	}

	log = (
		message: string,
		level: 'fatal' | 'warn' | 'error' | 'info' = 'info',
	) => {
		this.logger[level](`${this.prefix}: ${message}`);
	};
}
