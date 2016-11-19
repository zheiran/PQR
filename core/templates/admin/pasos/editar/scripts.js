<script>
	angularApp.controller('editarPasoController', function($scope) {
		$scope.usuarios = decodeEntities('{{ usuarios }}');
		$scope.proceso 	= decodeEntities('{{ proceso }}');
		$scope.paso 	= decodeEntities('{{ paso }}');
		document.editarPaso.action = '{% url "editarPaso" 101 102%}'.replace(/101/, $scope.proceso[0].id.toString()).replace(/102/, $scope.paso[0].id.toString());
		$scope.guardar = function() {
			document.editarPaso.submit();
		};
		$scope.volver = function () {
			location = '{% url "verPasos" 101%}'.replace(/101/, $scope.proceso[0].id.toString());
		};
	});
</script>