const Joi = require('@hapi/joi');

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
	character: Joi.string(),
	moves: Joi.array().items(MoveSchema),
});

const checkCharacter = character => {
	return CharacterSchema.validate(character);
};

module.exports = {
	checkCharacter,
};
