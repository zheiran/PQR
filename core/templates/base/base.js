<script>
	var decodeEntities = (function() {
		// this prevents any overhead from creating the object each time
		var element = document.createElement('div');

		  function decodeHTMLEntities (str) {
		  	if(str && typeof str === 'string') {
		      // strip script/html tags
		      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
		      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
		      element.innerHTML = str;
		      str = element.textContent;
		      element.textContent = '';
		  }

		  return str;
		}

		return decodeHTMLEntities;
	})();

	var angularApp = angular.module('pqrApp', []);
	angularApp.config(function($interpolateProvider , $httpProvider) { 
	    $interpolateProvider.startSymbol('[['); 
	    $interpolateProvider.endSymbol(']]'); 
	    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	});
</script>