var express = require('express'),
	ejs 	= require('ejs');

var crudActions = require('./crud_actions');

var app = express();

app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
	res.render('index.html');
});

app.get('/list', crudActions.list);
app.get('/get/:id', crudActions.get);
app.get('/add/:id', crudActions.add);
app.get('/remove/:id', crudActions.remove);



app.listen(3000, function() {
    console.log('Express server listening on port ' + 3000);
});