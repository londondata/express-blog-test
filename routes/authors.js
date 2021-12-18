//imports
const router = require("express").Router();
const ctrl = require("../controllers");

// routes
router.get("/", ctrl.authors.idx);
router.get("/new", ctrl.authors.newAuthor);
router.get("/:id", ctrl.authors.show);
router.post("/", ctrl.authors.create);
router.get("/:id/edit", ctrl.authors.edit);
router.put("/:id", ctrl.authors.update);
router.delete("/:id", ctrl.authors.destroy);

module.exports = router;
