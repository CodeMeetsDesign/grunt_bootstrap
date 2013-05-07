module.exports = function( grunt ) {
    grunt.registerTask("index", "Generate index.html depending on configuration", function() {
        var conf = grunt.config('index'),
            tmpl = grunt.file.read(conf.src);

        grunt.file.write(conf.dest, grunt.template.process(tmpl));
        grunt.log.writeln('Generated \'' + conf.dest + '\' from \'' + conf.src + '\'');
    });
}