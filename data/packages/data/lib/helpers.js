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
	block_advantage: Joi.number(),
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

const makeMove = (output, type) => {
	const [name] = Object.keys(output);
	const toNumber = x => x * 1;
	const splitOnComma = x => x.split(',');
	const transformations = {
		name: R.trim,
		field2: splitOnComma,
		field3: R.toLower,
		field4: toNumber,
		field5: toNumber,
		field6: toNumber,
		field7: toNumber,
		field8: toNumber,
		field9: toNumber,
	};
	const move = {
		name,
		type,
	};

	return R.evolve(transformations, move);
};

module.exports = {
	checkCharacter,
	checkMove,
	makeMove,
};
