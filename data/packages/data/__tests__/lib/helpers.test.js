const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');

const { exampleOutput } = require('../fixtures');
const { checkCharacter } = require('../../lib/helpers');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

suite('Given checkCharacter', () => {
	suite('And an example output', () => {
		test('it passes validation', async () => {
			await expect(checkCharacter(exampleOutput)).not.to.reject();
		});
	});
});
