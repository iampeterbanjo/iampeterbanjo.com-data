import Hodor from 'hapi-hodor';
import {
	SESSION_SECRET_KEY,
	AUTH0_AUDIENCE,
	AUTH0_DOMAIN,
	AUTH0_PUBLIC_KEY,
	AUTH0_SECRET_KEY,
} from '@iampeterbanjo/env';

export default {
	plugin: Hodor,
	options: {
		sessionSecretKey: SESSION_SECRET_KEY,
		auth0Audience: AUTH0_AUDIENCE,
		auth0Domain: AUTH0_DOMAIN,
		auth0PublicKey: AUTH0_PUBLIC_KEY,
		auth0SecretKey: AUTH0_SECRET_KEY,
	},
};
