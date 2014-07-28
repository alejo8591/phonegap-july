//Express "framework" estilo MVC para usar con node.js
//app.js -> Estructura 
//views -> Templates
//Ajax !!!

var express = require('express')
	, path = require('path')
	, bodyParser = require('body-parser')
	, cons = require('consolidate');

var app = express();

var debug = require('debug')('lab3-3');

//Configuracion para ExpressJS
app.set('port', process.env.PORT || 3535);
//motor templates con este consolidate
app.engine('html', cons.swig);
//Tipo de templates que se usaran
app.set('view engine', 'html');
//Path o directorio lodcal donde estaran estos documentos html
app.set('views', path.join(__dirname, 'views'));
//encomdimg para las tramas HTTP, o tipo de tramas pedidas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
//Sirviendo assets o estaticos JS, CSS
app.use(express.static(path.join(__dirname, 'public')));

//URLs a resolver
app.get('/', function(req, res){
	res.render('index', {'name':'Test App'});
});

app.post('/message', function(req, res){
	var data = {
		name : "Alejandro Romero",
		age : "28",
		id : "4544333"
	}
	//Mustra el body de la peticion
	console.log(req.body);
	res.json(data);
});

var server = app.listen(app.get('port'), function(){
	debug('Express esta escuchando el puerto: '+ server.address().port);
})