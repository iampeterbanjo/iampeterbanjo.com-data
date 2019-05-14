const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');
const sinon = require('sinon');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

const Repository = require('../repository');

suite('Repository', () => {
	test('new Repository', () => {
		const repository = new Repository();

		expect(repository).to.be.instanceOf(Repository);
	});

	test('save is called', () => {
		const save = sinon.spy();
		const name = 'test';
		const collection = {
			[name]: {
				save,
			},
		};

		const model = new Repository(collection, name);
		model.save();
		expect(collection.test.save.calledOnce).to.be.true();
	});

	test('save returns model', () => {
		const save = sinon.spy();
		const name = 'test';
		const collection = {
			[name]: {
				save,
			},
		};

		const model = new Repository(collection, name);
		const result = model.save();

		expect(result).to.equal(model);
	});
});
