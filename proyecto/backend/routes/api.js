var code = require('../app');

module.exports = function(app, db){
	// --------------------------- API V1 para el modelo "User" --------------------------------------- //

	loginUser = function(req, res){
		console.log("POST - login users");
		db.get("SELECT * FROM user WHERE email = ? AND password = ?", [req.body.email, req.body.password], function(err, rows) {
				console.log('POST login user with email: ' + req.body.email);
		        res.set('Access-Control-Allow-Origin', '*');
		        res.set('Access-Control-Allow-Methods', 'POST');
		        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
		        if(rows){
		        	rows.cookie = code.cookie;
		        	 res.send(rows);
		        } else if(err){
		        	console.log("Login failed due to SQLite error", err);
            		res.send(400);
		        } else {
		        	console.log("Login failed: user not found.");
		        	var message = '{"error":403}';
		        	var error = JSON.parse(message);
            		res.send(error);
		        }
		  });
	}

	// Buscando todos los usuarios y enviando la lista
	findAllUsers = function(req, res){
		console.log("GET - read all users");
		db.all("SELECT * FROM user", function(err, rows) {
			console.log('GET All Users');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'GET');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	        rows.forEach(function (row) {
	            console.log(row.id + ": " + row.firstname);
	        });
	        res.send(rows);
	        //closeDb();
    	});
	};
	// Buscando un usuario especifico por "email"
   findUser = function(req, res){
   		console.log("GET - read user by email= " + req.params.email);

	   	db.get("SELECT * FROM user WHERE email = ?", [req.params.email], function(err, rows) {
				console.log('GET user with email: ' + req.params.email);
		        res.set('Access-Control-Allow-Origin', '*');
		        res.set('Access-Control-Allow-Methods', 'GET');
		        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
		        res.send(rows);
		  });
   };
   // Creando un usuario con todos los campos: 
   // curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"firstname": "alejandro", "email": "al@ro.co", "lastname": "romero", "phone":"334334", "password": "!234"}' http://127.0.0.1:7070/api/v1/user/create
   createUser = function(req, res){
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'POST');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("INSERT INTO user (email, password, firstname, lastname, phone) VALUES (?, ?, ?, ?, ?)");
    		stmt.run([req.body.email, req.body.password, req.body.firstname, req.body.lastname, req.body.phone], function(err, rows){
    			if(err){
    				console.log("Save user failed");
		        	var message = '{"error":403}';
		        	var error = JSON.parse(message);
		        	console.log(code.cookie);
            		res.send(error);
    			} else {
    				db.get("SELECT * FROM user WHERE email = ?", [req.body.email], function(err, rows) {
    					if (err) {
    						res.send(err);
    					} else {
    						console.log('POST - save User with data = \n {' + '\n email : ' + req.body.email + '\n password : ' + req.body.password + '\n firstname : ' + req.body.firstname + '\n lastname : ' + req.body.lastname + '\n phone : ' + req.body.phone + '\n }');
    						rows.cookie = code.cookie;
    						console.log(code.cookie);
    						res.send(rows);
    					}
		  			});
    			}
    		});
   }
   // Actualizando un usuario, buscado por email y sin password
   updateUser = function(req, res){
   			console.log('POST - update User with data = \n {' + '\n email : ' + req.body.email + '\n firstname : ' + req.body.firstname + '\n lastname : ' + req.body.lastname + '\n phone : ' + req.body.phone + '\n }');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'POST');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("UPDATE user SET firstname = ?, lastname = ?, phone = ? WHERE email = ?");
    		stmt.run([req.body.firstname, req.body.lastname, req.body.phone, req.body.email], function(err, rows){
    			if(err){
    				console.log(err);
    				res.send(err);
    			} else{
    				db.get("SELECT * FROM user WHERE email = ?", [req.body.email], function(err, rows) {
    					if (err) {
    						res.send(err);
    					} else {
    						console.log('POST - update User with data = \n {' + '\n email : ' + req.body.email + '\n password : ' + req.body.password + '\n firstname : ' + req.body.firstname + '\n lastname : ' + req.body.lastname + '\n phone : ' + req.body.phone + '\n }');
    						rows.cookie = code.cookie;
    						res.send(rows);
    					}
		  			});
    			}
    		});
   }
   // Eliminando usuario por correo
   deleteUser = function(req, res){
   			console.log('DELETE user with email : ' + req.body.email);
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'DELETE');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("DELETE FROM user WHERE email = ?");
    		stmt.run(req.body.email);
   			res.send('update done');
   }
	  //Links de las rutas y las funciones
	  // URI ingresar a la app
	  app.post('/api/v1/user/login', loginUser);
	  // URI para traer todos los usuarios
	  app.get('/api/v1/user/list', findAllUsers);
	  // URI para buscar usuario especifico por email
	  app.get('/api/v1/user/:email', findUser);
	  // URI para crear usuario
	  app.post('/api/v1/user/create', createUser);
	  // URI para actualizar usuario
	  app.post('/api/v1/user/update', updateUser);
	  // URI para eliminar usuario
	  app.delete('/api/v1/user/delete', deleteUser);

  // --------------------------- API V1 para el modelo "Product" --------------------------------------- //

	// Buscando todos los productos y retornando
	findAllProducts = function(req, res){
		console.log("GET - read all Products");

		db.all("SELECT * FROM product", function(err, rows) {
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'GET');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	        rows.forEach(function (row) {
	            console.log(row.id + ": " + row.name);
	        });
	        res.send(rows);
    	});
	};
	// Buscando producto por ID especifico
   findProduct = function(req, res){
   	console.log("GET - read product by id : " + req.params.id);

   	db.get("SELECT * FROM product WHERE id = ?", [req.params.id], function(err, rows) {
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'GET');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	        res.send(rows);
	  });
   };
   // Crendo producto con todos los campos especificos
   createProduct = function(req, res){
   			console.log('POST - save Product with data = \n {' + '\n name : ' + req.body.name + '\n type : ' + req.body.type + '\n amount : ' + req.body.amount + '\n }');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'POST');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("INSERT INTO product (name, type, amount) VALUES (?, ?, ?)");
    		stmt.run(req.body.name, req.body.type, req.body.amount);
   			res.send('save done');
   }
   // Actualizando producto por id
   updateProduct = function(req, res){
   			console.log('PUT - update Product with data = \n {' + '\n name : ' + req.body.name + '\n type : ' + req.body.type + '\n amount : ' + req.body.amount + '\n }');
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'PUT');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("UPDATE product SET name = ?, type = ?, amount = ? WHERE id = ?");
    		stmt.run(req.body.name, req.body.type, req.body.amount, req.body.id);
   			res.send('update done');
   }
   // Eliminando producto por ID especifico
   deleteProduct = function(req, res){
   			console.log('DELETE product with id = ' + req.body.id);
	        res.set('Access-Control-Allow-Origin', '*');
	        res.set('Access-Control-Allow-Methods', 'DELETE');
	        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   			var stmt = db.prepare("DELETE FROM product WHERE id = ?");
    		stmt.run(req.body.id);
   			res.send('update done');
   }
	  //Link para las resolución de URLs y la gestión de las mismas
	  // URI para traer todos los productos de la base de datos
	  app.get('/api/v1/product/list', findAllProducts);
	  // URI para buscar por ID especifico
	  app.get('/api/v1/product/:id', findProduct);
	  // URI para crear un producto
	  app.post('/api/v1/product/create', createProduct);
	  // URI para actualizar un producto
	  app.put('/api/v1/product/update', updateProduct);
	  // URI para eliminar un producto
	  app.delete('/api/v1/product/delete', deleteProduct);

	// Close DB
	function closeDb() {
    	console.log("closeDb");
    	db.close();
    }
}
