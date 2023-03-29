const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('quiz');
});

app.post('/submit', (req, res) => {
  const numericResponses = [];
  const textualResponses = [];
  numericResponses.push(req.body.q1);
  numericResponses.push(req.body.q2);
  textualResponses.push(req.body.q3);
  textualResponses.push(req.body.q4);
  console.log(numericResponses);
  console.log(textualResponses);
  res.send('Your responses have been recorded');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});