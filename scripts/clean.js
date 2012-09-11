//steal/js scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/clean',function(){
	steal.clean('index.html',{indent_size: 1, indent_char: '\t'});
});
