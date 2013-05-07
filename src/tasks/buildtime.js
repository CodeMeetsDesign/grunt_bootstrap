module.exports = function( grunt ) {
	var starttime = Date.now();
	grunt.registerTask('buildtime', 'BuildTime output', function() {
		grunt.log.writeln('Build-Time:', Date.now() - starttime + 'ms');
	});
}