//imports
const router = require("express").Router();
const ctrl = require("../controllers");

// routes
router.get("/", ctrl.articles.index);
router.get("/new", ctrl.articles.newArticle);
router.get("/:id", ctrl.articles.show);
router.post("/", ctrl.articles.create);
router.get("/:id/edit", ctrl.articles.edit);
router.put("/:id", ctrl.articles.update);
router.delete("/:id", ctrl.articles.destroy);

//exports
module.exports = router;
