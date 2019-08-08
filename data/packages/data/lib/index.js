const Path = require('path');
const csv = require('csvtojson');
const R = require('ramda');

const mkxTsvPath = Path.join(
	__dirname,
	'../raw/mortal-kombat-x/cassie-cage.tsv'
);

const printOut = x => console.log;
const mapping = f => reducing => (result, input) => reducing(result, f(input));

const filtering = predicate => reducing => (result, input) =>
	predicate(input) ? reducing(result, input) : result;

const chain = (xs, x) => xs.concat(x);

const inspect = ({ value, index, move }) => {
	console.log(move);
	return { value, index, move };
};

const exampleOutput = {
	character: 'Cassie Cage',
	moves: [
		{
			name: 'Low jab',
			isCombo: false,
			isNormal: true,
			isSpecial: false,
			notation: ['d1'],
			hit_level: ['mid'],
			start_up: 7,
			active: 4,
			recovery: 15,
			block_advantage: -8,
			hit_advantage: 12,
			cancel: 18,
			notes: '',
			meter_burn: false,
		},
		{
			name: 'Rollin',
			isCombo: true,
			isNormal: false,
			isSpecial: false,
			notation: ['1', '1', '2'],
			hit_level: ['high', 'mid', 'mid'],
			start_up: 14,
			active: 4,
			recovery: 33,
			block_adv: -5,
			hit_advantage: 34,
			cancel: 25,
			notes: '',
			meter_burn: false,
		},
		{
			name: 'Glow Kick',
			isCombo: false,
			isNormal: false,
			isSpecial: true,
			notation: ['b', 'f', '4'],
			hit_level: ['mid'],
			start_up: 13,
			active: 5,
			recovery: 46,
			block_adv: -38,
			hit_advantage: 36,
			cancel: 0,
			notes: '',
			meter_burn: false,
		},
		{
			name: 'Diving Glow Kick',
			isCombo: false,
			isNormal: false,
			isSpecial: true,
			notation: ['b', 'f', '4', 'Block'],
			hit_level: ['mid'],
			start_up: 13,
			active: 31,
			recovery: 10,
			block_adv: -51,
			hit_advantage: 4,
			cancel: 0,
			notes: 'Armoured',
			meter_burn: true,
		},
	],
};

const setCharacterName = ({ value, index, move }) => {
	if (index !== 1) return value;
	// eslint-disable-next-line no-param-reassign
	move.name = R.invertObj(value).Name;
	return { value, index, move };
};

csv({ delimiter: '\t' })
	.fromFile(mkxTsvPath)
	.subscribe((value, index) => {
		[{ value, index, move: {} }]
			// .reduce(mapping(inspect)(chain), [])
			.reduce(mapping(setCharacterName)(chain), [])
			.reduce(mapping(inspect)(chain), []);
	});
