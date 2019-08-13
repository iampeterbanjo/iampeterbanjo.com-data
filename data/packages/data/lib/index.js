/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const Path = require('path');
const csv = require('csvtojson');
const R = require('ramda');

(async () => {
	class Character {
		constructor() {
			this.moves = [];
			this.name = 'Hello';
		}

		addMove(move) {
			this.moves.push(move);
		}

		set setName(name) {
			this.name = name;
		}

		toString() {
			return JSON.stringify({
				name: this.name,
				moves: this.moves,
			});
		}
	}

	const mkxTsvPath = Path.join(
		__dirname,
		'../raw/mortal-kombat-x/cassie-cage.tsv'
	);

	const cassieCage = new Character();
	const parseName = (value, index, cassie) => {
		if (index !== 0) {
			return;
		}

		const [name] = Object.keys(value);
		cassie.name = name;
	};
	const parseNormals = (value, index, cassie) => {
		if (index < 4 || index > 16) {
			return;
		}

		// 'Cassie Cage': 'Severance Package',
		// field2: 'F2, 1+3',
		// field3: 'M',
		// field4: '9',
		// field5: '4',
		// field6: '29',
		// field7: '-15',
		// field8: '1',
		// field9: '13'

		// const [name] = Object.values(options);
		const toNumber = x => x * 1;
		const splitOnComma = x => x.split(',');
		const transformations = {
			field2: splitOnComma,
			field3: R.toLower,
			field4: toNumber,
			field5: toNumber,
			field6: toNumber,
			field7: toNumber,
			field8: toNumber,
			field9: toNumber,
		};
		const move = R.evolve(transformations, value);
		// const {
		// 	name,
		// 	typename,
		// 	notationname,
		// 	hit_levelname,
		// 	start_upname,
		// 	activename,
		// 	recoveryname,
		// 	block_advantagename,
		// 	hit_advantagename,
		// 	cancelname,
		// 	notesname,
		// 	meter_burnname,
		// } = options;

		cassie.addMove(move);
	};

	const onError = error => console.warn(error);
	const onComplete = () => {
		console.log(cassieCage);
	};

	csv({ delimiter: '\t' })
		.fromFile(mkxTsvPath)
		.subscribe(
			(value, index) => {
				console.log(value, index);
				parseName(value, index, cassieCage);
				parseNormals(value, index, cassieCage);
			},
			onError,
			onComplete
		);
})();
