// Mongoose DB Config
const mongoose = require("mongoose");
// shortcut to mongoose.connection object, created by mongoose.connect
const db = mongoose.connection;
// local DB
const dbUrl = "URLHERE";
const configs = {
	useCreateIndex: true,
	useFindAndModify: false,
};
mongoose
	.connect(process.env.DATABASE_URL || dbUrl, configs)
	.then(() =>
		console.log(
			`MongoDB successfully connected at ${db.host}:${db.port}! How dope!`
		)
	)
	.catch((err) => console.log(`MongoDB connection FAILED :( Error: ${err}`));

// module.exports = {
// 	Author: require("./Author"),
// 	Article: require("./Article"),
// };

const db = module.exports;

db.Author = require("./Author");
db.Article = require("./Article");

/*
module.exports.Author = require("./Author");
module.exports.Article = require("./Article");
*/
