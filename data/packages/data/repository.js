/**
 * Class of Repository
 */
function Repository(collection, name) {
	this.save = () => {
		collection[name].save();

		return this;
	};
}

module.exports = Repository;
