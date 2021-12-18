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
	// mongoose
	db.Author.find({}, function (err, allAuthors) {
		if (err) return res.send(err);

		const context = { authors: allAuthors };

		return res.render("authors/index", context);
	});
};

// New

const newAuthor = (req, res) => {
	res.render("authors/new");
};

// Show

const show = (req, res) => {
	db.Author.findById(req.params.id, (err, foundAuthor) => {
		if (err) return res.send(err);

		const context = { author: foundAuthor };
		return res.render("authors/show", context);
	});
};

const show = (req, res) => {
	db.Game.findById(req.params.id, (err, foundGame) => {
		if (err) {
			console.log("Error in games#show:", err);

			return res.send("Incomplete games#show controller function");
		}

		res.status(200).json({
			game: foundGame,
		});
	});
};

// Create

const create = (req, res) => {
	//mongoose
	db.Author.create(req.body, function (err, createdAuthor) {
		if (err) return res.send(err);

		return res.redirect("/authors");
	});
};

// Edit

const edit = (req, res) => {
	db.Author.findById(req.params.id, function (err, foundAuthor) {
		if (err) return res.send(err);

		const context = { author: foundAuthor };
		return res.render("authors/edit", context);
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
		{ new: true },
		function (err, updatedAuthor) {
			if (err) return res.send(err);

			return res.redirect(`/authors/${updatedAuthor._id}`);
		}
	);
};

// Delete
const destroy = (req, res) => {
	db.Author.findByIdAndDelete(req.params.id, (err, deletedAuthor) => {
		if (err) return res.send(err);

		return res.redirect("/authors");
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
