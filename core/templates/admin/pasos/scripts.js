<script>
	angularApp.controller('pasosController', function($scope, $http) {
		$scope.pasos = decodeEntities('{{ pasos }}');
		$scope.proceso = decodeEntities('{{ proceso }}');
		$scope.nuevo = function() {
			location = '{% url "nuevoPaso" 01 %}'.replace(/01/, $scope.proceso[0].id.toString());
		};
		$scope.eliminar = function(id) {
			location = '{% url "eliminarPaso" 01 02%}'.replace(/01/, $scope.proceso[0].id.toString()).replace(/02/, id.toString()); 
		};
		$scope.editar = function(id) {
			location = '{% url "editarPaso" 01 02%}'.replace(/01/, $scope.proceso[0].id.toString()).replace(/02/, id.toString());
		}
	});
</script>