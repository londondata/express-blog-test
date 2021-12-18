// require
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema
const articleSchema = new Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

// model
const Article = mongoose.model("Article", articleSchema);

//export
module.exports = Article;

// same code:
// module.exports = mongoose.model("Article", articleSchema);
