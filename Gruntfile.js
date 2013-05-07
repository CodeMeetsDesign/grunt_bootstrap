module.exports = function(grunt) {
	
	grunt.loadTasks( "src/tasks" );
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: grunt.file.readJSON('settings.json'),
		
		uglify: {
			options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		
		production: {
			files: {
				'production/libs.min.js': ['src/js/libs/**/*.js']
			}
		},
		
		dev: {
			files: {
				'dev/libs.min.js': ['src/js/libs/**/*.js']
			}
		}
		},
		
		index: {
			src: 'src/tmpl/index.tmpl',
			dest: 'dev/index.html'
		}
	});

  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  //tasks
  grunt.registerTask('default', ['uglify:dev', 'index']);

};