/* Programacion Orientada a Objetos  */

function Person(firstName, lastName, profession, genre, age, city){
	this.firstName = firstName;
	this.lastName = lastName;
	this.profession = profession;
	this.genre = genre;
	this.age = age;
	this.city = city;
	this.studies = [];
}

Person.prototype = {
	constructor : Person,
	getFirstName : function(){
		console.log("El primer nombre de la Persona es: " + this.firstName);
	},
	getLastName : function(){
		console.log("El apellido de la Persona es: " + this.lastName);
	},
	getProfession : function(){
		console.log("La profesion de la Persona es: " + this.profession);
	},
	getGenre : function(){
		console.log("El genero de la Persona es: " + this.genre);
	},
	getAge : function(){
		console.log("El genero de la Persona es: " + this.genre);	
	},
	getCity : function(){
		console.log("El genero de la Persona es: " + this.genre);
	},
	getStudies : function(){
		for(var i=0;i < this.studies.length; i++){
			console.log("Tiene estudios en: " + this.studies[i]);
		}
		i = 0;
		for(i in this.studies){
			console.log("Tiene estudios en: " + this.studies[i]);
		}
	}
}