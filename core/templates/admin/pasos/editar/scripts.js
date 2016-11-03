<script>
	angularApp.controller('editarPasoController', function($scope) {
		$scope.usuarios = decodeEntities('{{ usuarios }}');
		$scope.proceso 	= decodeEntities('{{ proceso }}');
		$scope.paso 	= decodeEntities('{{ paso }}');
		document.editarPaso.action = '{% url "editarPaso" 01 02%}'.replace(/01/, $scope.proceso[0].id.toString()).replace(/02/, $scope.paso[0].id.toString());
		$scope.guardar = function() {
			document.editarPaso.submit();
		};
	});
</script>