steal( 'assets/js/libs/jquery' )
    .then( 'assets/js/libs/lodash' )
    .then( 'assets/js/libs/backbone' )
    .then( 'assets/js/libs/doT' )
    .then( 'assets/js/plugins/backbone.layoutmanager' )
    .then( 'assets/js/plugins/jquerypp.custom' )
	.plugins( 'steal/less' )
	.then(function(){						// Adds a function to be called back once all prior files have been loaded and run
		steal.less('assets/css/base');
	});
