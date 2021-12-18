const db = require("../models");

// base route is /articles

// Rest Routes
/*
 * Index - GET - /articles  - Presentational - respond with all articles

 * New - GET - /articles/new  - Presentational Form - a page with a form to create a new article

 * Show - GET - /articles/:id  - Presentational - respond with specific article by id

 * Create - Post - /articles  - Functional - recieve data from new route to create a article

 * Edit - GET - /articles/:id/edit  - Presentational Form - respond with a form prefilled with article data

 * Update - PUT - /articles/:id  - Functional - recieve data from edit to update a specific article

 * Delete - DELETE - /articles/:id  - Functional - Deletes article by id from request
 */

// Index

const idx = (req, res) => {
	db.Article.find({}, (err, foundArticles) => {
		if (err) res.send(err);

		const context = { articles: foundArticles };

		res.render("articles/index", context);
	});
};

// New

const newArticle = (req, res) => {
	// giving the new ejs template access to all authors for the article reference
	db.Author.find({}, (err, foundAuthors) => {
		if (err) res.send(err);

		const context = { authors: foundAuthors };
	});
	res.render("articles/new", context);
};

// Show

const show = (req, res) => {
	// .populate(key to populate) -> turn ids into the data from their model
	db.Article.findById(req.params.id)
		.populate("author") // basically db.Author.findById(), lets you reference documents in other collections by automatically replacin the specified paths in the document with document(s) from other collections
		//exec executes the query
		.exec((err, foundArticle) => {
			if (err) res.send(err);
			const context = { article: foundArticle };
			res.render("articles/show", context);
		});
};

// Create

const create = (req, res) => {
	//mongoose
	db.Article.create(req.body, (err, createdArticle) => {
		if (err) res.send(err);
		// allow us to add an article to the author
		db.Author.findById(createdArticle.author).exec(function (err, foundAuthor) {
			if (err) res.send(err);
			// update the author articles array
			foundAuthor.articles.push(createdArticle); // adds the article to the author
			foundAuthor.save(); // saves to db

			res.redirect("/articles");
		});
	});
};

// Edit

const edit = (req, res) => {
	db.Article.findById(req.params.id, (err, foundArticle) => {
		if (err) return res.send(err);

		const context = { article: foundArticle };
		returnres.render("articles/edit", context);
	});
};

// Update

const update = (req, res) => {
	db.Article.findByIdAndUpdate(
		req.params.id,
		{
			$set: {
				...req.body,
			},
		},
		// create new object in the database
		{ new: true },
		// callback function
		(err, updatedArticle) => {
			if (err) res.send(err);

			res.redirect(`/articles/${updatedArticle._id}`);
		}
	);
};

// Delete

const destroy = (req, res) => {
	db.Article.findByIdAndDelete(req.params.id, (err, deletedArticle) => {
		if (err) res.send(err);

		res.redirect("/articles");
	});
};

module.exports = {
	idx,
	newArticle,
	show,
	create,
	edit,
	update,
	destroy,
};
