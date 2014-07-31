module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				jshintrc : true
			},
			files: {
				src : ['www/js/lab3-12.js']
			}
		},
		htlhint: {
			options : {
				htmlhintrc : '.htmlhintrc'
			},
			html1 :{
				src : ['www/*.html']
			}
		},
		concat: {
		    options: {
		      stripBanners: true,
		      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
		        '<%= grunt.template.today("yyyy-mm-dd") %> */',
		    },
		    dist: {
		      src: ['www/js/jquery-1.11.1.min.js', 'www/jquery.mobile-1.4.3.min.js'],
		      dest: 'www/js/main.js'
		    }
		},
		uglify: {
		    my_target: {
		      files: {
		        'www/js/main.min.js': ['www/js/main.js']
		      }
		    }
 	 	},
	 	csslint: {
			  options: {
			    csslintrc: '.csslintrc'
			  },
			  strict: {
			    options: {
			      import: 2
			    },
			    src: ['www/css/styles.css']
			}
		  },
		cssmin: {
		  add_banner: {
		    options: {
		      banner: '/* My minified css file */'
		    },
		   files: {
		      'www/css/styles.min.css': [
			      'www/css/jquery.mobile-1.4.3.min.css',
			      'www/css/jquery.mobile.structure-1.4.3.min.css',
			      'www/css/jquery.mobile.theme-1.4.3.min.css',
			      'www/css/jquery.mobile.external-png-1.4.3.min.css',
			      'www/css/jquery.mobile.icons-1.4.3.min.css'
		      ]
		    }
		  }
		}
});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');


	grunt.registerTask('default', ['jshint', 'htmlhint']);
	grunt.registerTask('testjs', ['jshint']);
	grunt.registerTask('testhtml', ['htmlhint']);
	grunt.registerTask('testcss', ['csslint', 'cssmin']);
	grunt.registerTask('myjs', ['concat', 'uglify']);

};
