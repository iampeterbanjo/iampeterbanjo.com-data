import jobs from './jobs';

describe('Given jobs', () => {
	test('When it has definition for import chart top tracks', () => {
		const { description, routine } = jobs.IMPORT_CHART_TOP_TRACKS;

		expect(description).toEqual('import chart top tracks');
		expect(typeof routine).toEqual('function');
	});
});
