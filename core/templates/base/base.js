<script>
	var angularApp = angular.module('pqrApp', []);
	angularApp.config(function($interpolateProvider , $httpProvider) { 
	    $interpolateProvider.startSymbol('[['); 
	    $interpolateProvider.endSymbol(']]'); 
	    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	});
</script>