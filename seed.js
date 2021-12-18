// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require("./models");

const newArticle = {
	title: { type: String, required: true },
	body: { type: String, required: true },
};

db.Article.create(newArticle, (err, article) => {
	if (err) {
		console.log("Error:", err);
	}

	console.log("Created new article", article._id);
	process.exit();
});
