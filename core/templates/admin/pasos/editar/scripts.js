<script>
	angularApp.controller('editarPasoController', function($scope) {
		$scope.usuarios = decodeEntities('{{ usuarios }}');
		$scope.proceso 	= decodeEntities('{{ proceso }}');
		$scope.paso 	= decodeEntities('{{ paso }}');
		document.editarPaso.action = '{% url "editarPaso" 12345 67890%}'.replace(/12345/, $scope.proceso[0].id.toString()).replace(/67890/, $scope.paso[0].id.toString());
		$scope.guardar = function() {
			document.editarPaso.submit();
		};
	});
</script>