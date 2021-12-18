// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require("./models");

const newArticle = {
	title: "the sad story of the seed.js file",
	body: "if we water this file, will it grow? what shall nourish our young data? what do you need, seed?",
};

db.Article.create(newArticle, (err, article) => {
	if (err) {
		console.log("Error:", err);
	}

	console.log("Created new article", article._id);
	process.exit();
});
