/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const Path = require('path');
const csv = require('csvtojson');
// const R = require('ramda');

(async () => {
	class Character {
		constructor() {
			this.moves = [];
			this.name = 'Hello';
		}

		addMove(options) {
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
			this.moves.push(options);
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

		cassie.addMove(value);
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
