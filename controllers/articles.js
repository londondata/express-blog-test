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
	res.render("articles/new");
};

// Show

const show = (req, res) => {
	db.Article.findById(req.params.id, (err, foundArticle) => {
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

		res.redirect("/articles");
	});
};

// Edit

const edit = (req, res) => {
	db.Article.findById(req.params.id, (err, foundArticle) => {
		if (err) res.send(err);

		const context = { article: foundArticle };
		res.render("articles/edit", context);
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
