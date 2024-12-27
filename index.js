const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.send("API is working fine !")
  // res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
