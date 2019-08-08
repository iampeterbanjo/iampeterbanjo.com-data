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

const inspect = all => {
	console.log(all);
	return all;
};

const setCharacterName = ({ value, index, character, ...rest }) => {
	if (index !== 1) return value;
	// eslint-disable-next-line no-param-reassign
	character.name = R.invertObj(value).Name;
	return { value, index, character, ...rest };
};

const updateStatus = ({ index, status, ...rest }) => {
	if (index > 3) {
		return {
			...rest,
			index,
			status: { ...status, type: 'normal' },
		};
	}
	return { index, status, ...rest };
};

const character = {};
const status = {};
csv({ delimiter: '\t' })
	.fromFile(mkxTsvPath)
	.subscribe((value, index) => {
		[{ value, index, character, status }]
			// .reduce(mapping(inspect)(chain), [])
			.reduce(mapping(updateStatus)(chain), [])
			.reduce(mapping(setCharacterName)(chain), [])
			.reduce(mapping(inspect)(chain), []);
	});
