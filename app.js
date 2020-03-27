var express = require('express');
var app = express();

//app sets and uses static files
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/models', express.static('models')); 

// app calls data from Routes 
app.use(require('./routes/rabout'));
app.use(require('./routes/rcontact'));
app.use(require('./routes/rconnection'));
app.use(require('./routes/rconnections'));
app.use(require('./routes/rindex'));
app.use(require('./routes/rnewConnections'));
app.use(require('./routes/rLogin'));
app.use(require('./Routes/rUserProfile'));
app.use(require('./routes/rconnections'));
app.use(require('./routes/rSignUp'));
app.use(require('./routes/rMySessions'));
app.use('/*',require('./routes/rindex'));



// port #8080
app.listen(8080);
