const Path = require('path');
const csv = require('csvtojson');

const mkxTsvPath = Path.join(
	__dirname,
	'../raw/mortal-kombat-x/cassie-cage.tsv'
);

csv({ delimiter: '\t' })
	.fromFile(mkxTsvPath)
	.subscribe(console.log);
