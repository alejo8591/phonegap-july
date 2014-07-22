var logic = require('./logic');

exports.get = function(req, res){
	res.writeHead(200, {
		'Content-Type' : 'text/html'
	});

	res.end(
		logic.page('Operación Matemática',
			logic.navbar(),
			'<p>Operación Matemática</p>'
		)
	);
}