<script>
	angularApp.controller('pasosController', function($scope, $http) {
		$scope.pasos = decodeEntities('{{ pasos }}');
		$scope.proceso = decodeEntities('{{ proceso }}');
		$scope.nuevo = function() {
			location = '{% url "nuevoPaso" 12345%}'.replace(/12345/, $scope.proceso[0].id.toString());
		};
		$scope.eliminar = function(id) {
			location = '{% url "eliminarPaso" 12345 67890%}'.replace(/12345/, $scope.proceso[0].id.toString()).replace(/67890/, id.toString()); 
		};
		$scope.editar = function(id) {
			location = '{% url "editarPaso" 12345 67890%}'.replace(/12345/, $scope.proceso[0].id.toString()).replace(/67890/, id.toString());
		}
	});
</script>