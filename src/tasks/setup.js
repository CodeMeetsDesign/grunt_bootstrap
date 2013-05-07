var request = require('request'),
	fs = require('fs');

module.exports = function( grunt ) {
    grunt.registerTask("setup", "Setup a new Project", function(arg) {
        var config = grunt.config.get('config'),
        	done = this.async();
        	
        switch(config.projectType) {
	        case 'raw':
	        	grunt.log.writeln('Project type is raw');
	        break;
	        
	        case 'bootstrap':
	        	grunt.log.writeln('Project type is bootstrap');
	        break;
	        
	        default:
	        	grunt.log.writeln('no Project type was specified using raw');
	        break;
        }
    });   
});