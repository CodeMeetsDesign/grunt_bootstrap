module.exports = function(grunt) {
	
	grunt.loadTasks( "src/tasks" );
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		settings: grunt.file.readJSON('settings.json'),
		
		watch: {
			src: {
				files: ["src/less/**/*.less", ""],
				tasks: ['development']
			}
		},
		
		less: {
			development: {
				options: {
					paths: ["src/bootstrap/less/"]
				},
				
				files: [
					{dest: "development/assets/css/styles-all.css", src:["src/bootstrap/less/bootstrap.less", "src/less/*.less"]}
				]
			},
			
			production: {
				options: {
					paths: ["src/bootstrap/less/"],
					yuicompress: true
				},
				
				files: {
					"production/assets/css/styles-all.css": ["src/bootstrap/less/bootstrap.less", "src/less/*.less"]
				}
			}
		},
		
		uglify: {
			development: {
				options: {
					beautify: true,
					banner: '/*! <%= settings.projectName %> - v:<%= pkg.version %> - build: <%= pkg.build %> ' +
							'<%= grunt.template.today("yyyy-mm-dd") %> */'
				},
				
				files: {
					'development/assets/js/app-all.min.js': ['src/js/**/*.js']
				}
			},
			
			production: {
				options: {
					compress: true,
					sourceMap: 'production/assets/js/source-map.js',
					banner: '/*! <%= settings.projectName %> - v:<%= pkg.version %> - build: <%= pkg.build %> ' +
							'<%= grunt.template.today("yyyy-mm-dd") %> */'
				},
				
				files: {
					'production/assets/js/app-all.min.js': ['src/js/**/*.js']
				}
			}
		},
			
		index: {
			src: 'src/tmpl/index.tmpl',
			dest: 'development/index.html'
		},
		
		curl: {
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-curl');
	
	//tasks
	grunt.registerTask('default', ['development']);
	
	grunt.registerTask('development', 'Development Build', function() {
		grunt.task.run('less:development', 'uglify:development', 'index', 'increment-build', 'buildtime');
	});
	
	grunt.registerTask('production', 'Production Build', function() {
		grunt.task.run('less:production', 'uglify:production', 'index', 'increment-build', 'buildtime');
	});

};