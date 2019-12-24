import { getDbConnection } from '@iampeterbanjo/models';
import Agenda from 'agenda';

import plugin from './plugin';

export default {
	plugin,
	options: { getDbConnection, Agenda },
};
