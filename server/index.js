const express = require('express');
const parser = require('body-parser');
const db = require("../database")

const app = express();
const port = 3000;

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get("/allPokemon/:id", (req, res) => {
  db.getAllPokemon(req.params.id, (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send("error retrieving pokemon");
    } else{
      res.status(200).send(data);
    }
  });
});

app.post("/capture:id", (req, res) => {
  console.log(req.params);
  db.capture(req.params.id, req.body, (err) => {
    if (err) {
      res.status(406).send(err);
    } else {
      res.status(202).send("Updated!")
    }
  })
})

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});