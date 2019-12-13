const exphdb = require("express-handlebars");
const express = require("express");
const mysql = require("mysql");

var PORT = process.env.PORT || 3030;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let connection

// connection
if (process.env.JAWSDB_URL) {
    connection.mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "rootroot",
        database: "burger_db"
    });
};
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    let queryString = "SELECT * FROM burgers"
    connection.query(queryString, (err, result) => {
        if (err) throw err;
        console.log(res);
        res.render("index", { burger: result })

    })
});

app.put("/api/burger", (req, res) => {
    console.log(req.body);
    let queryString = "UPDATE burgers SET devoured = 1 WHERE id = ?"
    connection.query(queryString, req.body.id, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.sendStatus(200)
    })
});

app.post("/api/burger", (req, res) => {
    console.log(req.body);
    let queryString = "INSERT INTO burgers (burger_name, devoured) VALUES (?,false)"
    console.log(queryString);
    connection.query(queryString, req.body.name, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.sendStatus(200)
    })
});

app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
});