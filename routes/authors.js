//imports
const router = require("express").Router();
const ctrl = require("../controllers");

// routes
router.get("/", ctrl.authors.index);
router.get("/:id", ctrl.authors.show);
router.post("/", ctrl.authors.create);
router.put("/:id", ctrl.authors.update);
router.delete("/:id", ctrl.authors.destroy);

//exports
module.exports = router;
