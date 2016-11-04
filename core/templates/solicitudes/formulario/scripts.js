<script>
	angularApp.controller('formularioController', function($scope) {
	  	console.log('{{ log }}');
	  	console.log('{{ paso }}');
	  	$scope.log = decodeEntities('{{ log }}');
	  	$scope.paso = decodeEntities('{{ paso }}');
	  	console.log($scope.log);
	});
</script>