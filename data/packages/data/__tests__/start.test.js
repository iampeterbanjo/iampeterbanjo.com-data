const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

suite('data', () => {
	test('first test', () => {
		expect('not implemented').to.equal('true');
	});
});
