// require models from the database
const db = require("../models");

// Rest Routes
/*
 * Index - GET - /authors  - Presentational - respond with all authors
 * New - GET - /authors/new  - Presentational Form - a page with a form to create a new author
 * Show - GET - /authors/:id  - Presentational - respond with specific author by id
 * Create - Post - /authors  - Functional - recieve data from new route to create a author
 * Edit - GET - /authors/:id/edit  - Presentational Form - respond with a form prefilled with author data
 * Update - PUT - /authors/:id  - Functional - recieve data from edit to update a specific author
 * Delete - DELETE - /authors/:id  - Functional - Deletes author by id from request
 */

// Index

const idx = (req, res) => {
	// mongoose syntax
	db.Author.find({}, (err, allAuthors) => {
		if (err) res.send(err);

		const context = { authors: allAuthors };

		res.render("authors/index", context);
	});
};

// New
// Author does not depend on article to exist, so this does not change
const newAuthor = (req, res) => {
	res.render("authors/new");
};

// Show

const show = (req, res) => {
	db.Author.findById(req.params.id)
		// .populate(resource key to populate) -> turn ids into the data from their model
		// basically db.Article.find() all of the articles (plural) attached to that Author resource) by automatically replacin the specified paths in the document with document(s) from other collections
		.populate("articles")
		//exec executes the query
		.exec((err, foundAuthor) => {
			if (err) res.send(err);

			const context = { author: foundAuthor };
			res.render("authors/show", context);
		});
};

// Create
// Author does not depend on article to exist, so this does not change
const create = (req, res) => {
	//mongoose
	db.Author.create(req.body, (err, createdAuthor) => {
		if (err) res.send(err);

		res.redirect("/authors");
	});
};

// Edit

const edit = (req, res) => {
	db.Author.findById(req.params.id, (err, foundAuthor) => {
		if (err) res.send(err);

		const context = { author: foundAuthor };
		res.render("authors/edit", context);
	});
};

// Update

const update = (req, res) => {
	db.Author.findByIdAndUpdate(
		req.params.id,
		{
			$set: {
				...req.body,
			},
		},
		// create new object in the database
		{ new: true },
		// callback function
		(err, updatedAuthor) => {
			if (err) res.send(err);

			res.redirect(`/authors/${updatedAuthor._id}`);
		}
	);
};

// Delete
const destroy = (req, res) => {
	db.Author.findByIdAndDelete(req.params.id, (err, deletedAuthor) => {
		if (err) res.send(err);

		res.redirect("/authors");
	});
};

// export router
module.exports = {
	idx,
	newAuthor,
	show,
	create,
	edit,
	update,
	destroy,
};
