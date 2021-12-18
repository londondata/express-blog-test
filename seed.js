// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require("./models");

const createdArticle = {
	title: "the sad story of the seed file",
	body: "if we water this dotjs file, will it grow? what shall nourish our young data? what do you need, seed?",
};

db.Article.create(createdArticle, (err, Article) => {
	if (err) {
		console.log("Error:", err);
		console.log(db.Article);
	}

	console.log("Created new article", Article._id);
	process.exit();
});
