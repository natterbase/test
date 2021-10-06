let http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cookieParser = require('cookie-parser');



// Prince is commennting
//  Testing  with Greenhouse 11:54 AM

//A quick test with  Kayode.... VP!


const app = express(),
    cors = require('cors');

app.use(compression());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
}));
app.use(express.static(__dirname + '/views'));
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => res.render('index'));

// catch 404 and forward to error handler
app.use((req, res) => {
    res.status(404);

    if (req.accepts('html')) {
        return res.render('404', {
            url: req.url
        });
    }

    if (req.accepts('json')) {
        return res.send({
            error: 'Not found'
        });
    }

    res.type('txt').send('Not found');
});

//Hayh to test you!

app.get('/error', (req, res) => {
    console.log(req.query.error);
    res.render('404', {
        url: req.url,
        error: req.query.error
    });
});

module.exports = app;

let server = http.createServer(app);
server.listen(4991, function () {
    console.log('server is running');
});
