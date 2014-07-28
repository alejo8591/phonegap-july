module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src : [
					'js/*.js'
				],
				dest : 'js/dist/production.js'
			}
		},
		cssmin : {
			combine : {
				files : {
					'css/dist/production.css' : ['css/*.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['concat', 'cssmin']);
};