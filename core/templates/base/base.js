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
			  	str = str.replace(/'/g, '"');
		      	str = str.replace(/ F/g, ' f');
		      	str = str.replace(/ T/g, ' t');
		      	str = str.replace(/ None/g, ' null');
		      	re = /datetime.datetime\((.+?), tzinfo=<UTC>\)/g,
        		subst = '"$1"';
    			str = str.replace(re, subst);
    			re = /datetime.date\((.+?)\)/g,
        		subst = '"$1"';
    			str = str.replace(re, subst);
		      	str = JSON.parse(str);
		  	return str;
		}

		return decodeHTMLEntities;
	})();
	var decodeDates = (function(dateStr) {
		function decodeDatesString (dateStr) {
			if(dateStr && typeof dateStr === 'string') {
			  	dateStr = dateStr.replace(/ /g, '');
			  	dateStr = dateStr.split(",");
		     }
		  	return dateStr;
		}

		return decodeDatesString;
	})();

	var angularApp = angular.module('pqrApp', ['ui.bootstrap']);
	angularApp.config(function($interpolateProvider , $httpProvider) { 
	    $interpolateProvider.startSymbol('[['); 
	    $interpolateProvider.endSymbol(']]'); 
	    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	});
</script>