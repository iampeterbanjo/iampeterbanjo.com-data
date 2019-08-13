const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');

const { exampleOutput } = require('../fixtures');
const { checkCharacter, checkMove, makeMove } = require('../../lib/helpers');

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

suite('Given checkMove', () => {
	suite('And an invalid output', () => {
		const invalid = {
			'Cassie Cage': 'Air Power Slam',
			field2: '(Air) D1+3',
			field3: 'UB',
			field4: '7',
			field5: '2',
			field6: '11',
			field7: 'N/A',
			field8: '-2',
			field9: '53',
		};

		test('it does NOT pass validation', async () => {
			await expect(checkMove(invalid)).to.reject();
		});

		test('it passes validation after transformation', async () => {
			await expect(checkMove(makeMove(invalid))).not.to.reject();
		});
	});
});
