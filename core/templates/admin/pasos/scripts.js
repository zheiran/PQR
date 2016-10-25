<script>
	angularApp.controller('pasosController', function($scope) {
		$scope.pasos = decodeEntities('{{ pasos }}');
	});
</script>