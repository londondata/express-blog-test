// require
const mongoose = require("mongoose");

// set up schema for validation
const authorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "You must provide a name property"],
		},
		// author schema references the article schema
		articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
	},
	{
		timestamps: true,
	}
);

// then we create the model with the schema for use in the rest of our application
const Author = mongoose.model("Author", authorSchema);

// export model
module.exports = Author;

// shorthand Schema export
/* module.exports = mongoose.model("Author", authorSchema); */
