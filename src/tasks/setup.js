var exec = require('child_process').exec;

module.exports = function( grunt ) {
    grunt.registerTask("setup", "Setup a new Project", function(arg) {
        var settings = grunt.config('settings'),
        	curlFiles = grunt.config('curl');
        	
        switch(settings.projectType) {
	        case 'raw':
	        	grunt.log.writeln('Project type is raw');
	        break;
	        
	        case 'bootstrap':
	        	grunt.log.writeln('Donwloading the Bootstrap-Files');
	        	grunt.log.writeln('Please wait...');
	        	
	        	cloneBootstrap(this);
	        	
	        	//Download the jsLibrarys set in settings
	        	settings[settings.projectType].jsLibrarys.forEach(function(item) {
		        	curlFiles[item.path] = item.url;
	        	});
	        	grunt.config('curl', curlFiles);
	        	grunt.task.run('curl');
	        	
	        break;
	        
	        default:
	        	grunt.log.writeln('no Project type was specified using raw');
	        break;
        }
        
        function cloneBootstrap(self) {
		    var done = self.async();
		    
		    var child = exec('git clone --depth=1 https://github.com/twitter/bootstrap.git src/bootstrap', function(err, stdout, stderr) {
			    if(err) {
				    throw err;
				}
			    grunt.log.writeln(stdout);
			    grunt.log.ok();
			    done();
		    });
	    }	
    });
};