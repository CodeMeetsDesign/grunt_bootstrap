/**
 * HOW TO:
 *	
 *  GRUNTFILE:
 *
 *	templates: {
 *				includesFolder: "src/tmpl/includes/",
 *				files: [
 *					{dest: "development/index.html", src: "src/tmpl/index.tmpl"},
 *					{dest: "development/content.html", src: "src/tmpl/content.tmpl"}
 *				]
 *		}
 *
 *	USAGE:
 *  
 *  templates defined in 'files' will be compiled to html files via underscore.js 
 *  subtemplates must be placed in 'includesFolder' and can be included with @templatename.tmpl@
 *
 */
module.exports = function( grunt ) {
    grunt.registerTask("templates", "Generate multiple templates and include subtempates", function() {
        var conf = grunt.config('templates');
        var  templ,
       		 matches,
	   		 include;
        
        for(var i in conf.files){
	        
	        templ = grunt.file.read(conf.files[i].src);
	        
	        //match templates included with @name.tmpl@
	        matches = templ.match(/\@(.*)\@/g);
			
			//replace each match
	        for(var j in matches){
		        include = grunt.file.read(conf.includesFolder + matches[j].replace(/@/g,''));
		        var regex = new RegExp(matches[j],'g');
		        templ = templ.replace(regex,include);
	        }
	        
	        grunt.file.write(conf.files[i].dest, grunt.template.process(templ));
	        grunt.log.writeln('Generated \'' + conf.files[i].dest + '\' from \'' + conf.files[i].src + '\'').ok();
        }
        
    });
}