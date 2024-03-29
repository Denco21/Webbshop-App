var Db = require('./dboperations');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
var csrf = require('csurf');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
app.use(csrf({cookie: true}))

router.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self' 'http://localhost:3000'; font-src 'self'; img-src *; script-src 'self'; style-src 'self'; frame-src 'self'"
      );
    next();
});

router.route('/register').post((req, res) => {
    res.setHeader("Content-Type", "text/html");
    let table ={...req.body};
    Db.addTable(table).then((data) => {
        res.status(201).json(data);
    })
})

router.route('/login').post((req, res) => {
    res.setHeader("Content-Type", "text/html");
    let credentials ={...req.body};
    Db.login(res,credentials).then((data) => {
        res.status(201).json(data);
    })
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Table API is running at ' + port)