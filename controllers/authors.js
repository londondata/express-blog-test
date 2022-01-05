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
		//.populate populates show page with all articles on show page for authors. the string it takes in is the key that we're populating from the schema (not the model)
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
// logic to PUT/REPLACE data in the database
const update = (req, res) => {
	db.Author.findByIdAndUpdate(
		req.params.id,
		{
			$set: {
				// name: req.body.name
				// additional key:value pairs from model
				...req.body,
			},
		},
		// create new object in the database
		{ new: true },
		// callback function after the update has completed
		(err, updatedAuthor) => {
			if (err) res.send(err);

			res.redirect(`/authors/${updatedAuthor._id}`);
		}
	);
};

// Delete
// this is a cascade delete, finding all articles by the same author and deleting them, because we're deleting the author. this is essentially about database memory and storage, deleting all associated resources. since the author is the one in the one to many, we have to delete the many when we delete the one.
const destroy = (req, res) => {
	db.Author.findByIdAndDelete(req.params.id, (err, deletedAuthor) => {
		if (err) res.send(err);

		db.Article.deleteMany(
			{ author: deletedAuthor._id },
			(err, deletedArticles) => {
				if (err) return res.send(err);

				res.redirect("/authors");
			}
		);
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
