var  d, minutes, time, hours, message;

// Utilizamos el objeto Date de JS
d = new Date();

console.log(d);

hours = d.getHours();
minutes = d.getMinutes();

console.log(hours);
console.log(minutes);

if(hours < 10){
	hours = "0" + hours; // Convierto en string "hours"
} else {
	hours = hours.toString(); 
}

console.log(hours);

if(minutes < 10){
	minutes = "0" + minutes;
} else {
	minutes = minutes.toString();
}

console.log(typeof(minutes));

time = Number(hours + minutes);

console.log(typeof(time));

console.log(time);

if(time >= 0000 && time < 1200){
	console.log("Buenos dias");
} else if(time >=1200 && time < 1700){
	console.log("Buenas tardes");
} else if(time >=1700 && time < 2359){
	console.log("Buenas noches");
}
