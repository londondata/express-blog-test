require("dotenv").config();
/* ==== External Modules ==== */
const express = require("express");
const methodOverride = require("method-override");

/* ==== Internal Modules ==== */
const routes = require("./routes");

/* ==== Instanced Modules  ==== */
const app = express();

/* ====  Configuration  ==== */
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");

/* ====  Middleware  ==== */
// body data middleware
app.use(express.urlencoded({ extended: true }));

// method override middleware
app.use(methodOverride("_method"));
// serve public files
app.use(express.static("public"));
// logger
app.use((req, res, next) => {
	console.log(req.url, req.method);
	next();
});

/* ====  Routes & Controllers  ==== */
// Home Route
app.get("/", (req, res) => {
	res.send("<h1>welcome to dope blog app!</h1>");
});

// 404 route
app.get((req, res) => {
	res.send("404! Error! Page not found :(");
});
// Internal Routes
app.use("/authors", routes.authors);
app.use("/articles", routes.articles);

/* ====  Server Listener  ==== */
app.listen(PORT, () => {
	console.log(`Dope blog app is live at http://localhost:${PORT}`);
});
