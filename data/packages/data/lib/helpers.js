const Joi = require('@hapi/joi');
const R = require('ramda');

const MoveSchema = Joi.object({
	name: Joi.string().lowercase(),
	type: Joi.string().allow(['combo', 'normal', 'special']),
	notation: Joi.array().items(Joi.string().lowercase()),
	hit_level: Joi.array().items(Joi.string().lowercase()),
	start_up: Joi.number(),
	active: Joi.number(),
	recovery: Joi.number(),
	block_advantage: Joi.any(),
	hit_advantage: Joi.number(),
	cancel: Joi.number(),
	notes: Joi.string().allow(''),
	meter_burn: Joi.boolean(),
});

const CharacterSchema = Joi.object({
	name: Joi.string(),
	moves: Joi.array().items(MoveSchema),
});

const checkCharacter = character => {
	return CharacterSchema.validate(character);
};

const checkMove = move => {
	return MoveSchema.validate(move);
};

const renameKeys = R.curry((keysMap, obj) =>
	R.reduce((acc, key) => R.assoc(keysMap[key], obj[key], acc), {}, R.keys(obj))
);

const makeMove = (raw, type) => {
	const [name] = Object.keys(raw);
	const toNumber = x => x * 1;
	const splitOnComma = x => x.split(',');
	// @ts-ignore
	const formatted = renameKeys({
		field2: 'notation',
		field3: 'hit_level',
		field4: 'start_up',
		field5: 'active',
		field6: 'recovery',
		field7: 'block_advantage',
		field8: 'hit_advantage',
		field9: 'cancel',
		field10: 'notes',
	})(raw);

	const transformations = {
		name: R.trim,
		notation: splitOnComma,
		hit_level: R.compose(
			x => x.split(','),
			R.toLower
		),
		start_up: toNumber,
		active: toNumber,
		recovery: toNumber,
		block_advantage: toNumber,
		hit_advantage: toNumber,
		notes: toNumber,
	};
	const move = {
		...formatted,
		name,
		type,
	};

	delete move.undefined;

	return R.evolve(transformations, move);
};

export default  {
	checkCharacter,
	checkMove,
	makeMove,
};
