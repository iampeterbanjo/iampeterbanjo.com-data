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
