var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/', function(req, res) {
  console.log(req.body);
});

module.exports = router;
