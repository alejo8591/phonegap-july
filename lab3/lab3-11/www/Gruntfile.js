module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				jshintrc : true
			},
			files: {
				src : ['js/*.js']
			}
		},
		htlhint: {
			options : {
				htmlhintrc : '.htmlhintrc'
			},
			html1 :{
				src : ['*.html']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-htmlhint');

	grunt.registerTask('default', ['jshint', 'htmlhint']);
};