steal(function(steal){
	
steal.test =  {
	//clears every property fromt he window, returns steal (might return old stuff)
	clear: function() {
		var win = this.getWindow();
		for(var n in win){
			if(n != "_S"){
				//this[n] = null;
				delete win[n];
			}
		}
		this.testNamespace();
		return steal;
	},
	getWindow: function() {
		return (function(){return this}).call(null,0)
	},
	wait: function( name ) {
		var checkExists = function(name){
	        var parts = name.split(".");
	        var cur = this;
	        for(var i =0; i < parts.length; i++){
	            if(! cur[parts[i]] ){
	                return false;
	            }else
	                cur = cur[parts[i]];
	        }
	        return true;
	    }
	    while(!checkExists(name)){
	        java.lang.Thread.currentThread().sleep(300);
	    }
	},
	sleep: function( duration ){
        java.lang.Thread.currentThread().sleep(duration);		
	},
	print: function() {
		var win =this.getWindow();
		for(var n in win) print(n);
	},
	deleteDir: function( dir ) {
		if (dir.isDirectory()) {
	        var children = dir.list();
	        for (var i=0; i<children.length; i++) {
	            var success = deleteDir(new java.io.File(dir, children[i]));
	            if (!success) return false;
	            
	        }
	    }
	
	    // The directory is now empty so delete it
	    return dir['delete']();
	},
	remove: function() {
		for(var i=0; i < arguments.length; i++){
			this.deleteDir(new java.io.File(arguments[i]) )
		}
	},
	testNamespace: function() {
		var win = this.getWindow();
		for(var n in win) {
			if(n !== "_S")
				throw "Namespace Pollution";
		}
	},
	equals: function( a, b, message ) {
		if(a !== b)
			throw ""+a+"!="+b+":"+message
	},
	ok: function( v, message ) {
		if(!v){
			throw "not "+v+" "+message
		}
	},
	open: function( src ) {
		load("steal/rhino/env.js");
		Envjs(src, {scriptTypes : {"text/javascript" : true,"text/envjs" : true}, fireLoad: true, logLevel: 2});
	}
}
	
})