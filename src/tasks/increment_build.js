module.exports = function(grunt) {
	grunt.registerTask('increment-build', function() {
		var pkg = grunt.config('pkg');
		pkg.build = parseInt(pkg.build) + 1;
		grunt.file.write('package.json', JSON.stringify(pkg,null,2));
	});
};