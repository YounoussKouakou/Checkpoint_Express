// express
const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

const dataPath = path.join(__dirname, "src");

// middleware
const restriction = (req, res, next) => {
  const date = new Date();
  const jour = date.getDay();
  const heure = date.getHours();
  if (jour >= 1 && jour <= 5 && heure >= 9 && heure < 17) {
    return next();
  } else {
    res
      .status(403)
      .send(
        "Le service est disponible uniquement pendant les heures de travail (lundi-vendredi, 9h-17h)."
      );
  }
};

app.use(restriction);
// first route
app.get("/", (req, res) => {
  res.sendFile(path.join(dataPath, "index.html"));
});

// second route
app.get("/contact", (req, res) => {
  res.sendFile(path.join(dataPath, "contact.html"));
});

// last route
app.get("/service", (req, res) => {
  res.sendFile(path.join(dataPath, "service.html"));
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
