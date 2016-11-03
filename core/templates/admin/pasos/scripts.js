<script>
	angularApp.controller('pasosController', function($scope, $http) {
		$scope.pasos = decodeEntities('{{ pasos }}');
		$scope.proceso = decodeEntities('{{ proceso }}');
		$scope.nuevo = function() {
			location = '{% url "nuevoPaso" 101 %}'.replace(/101/, $scope.proceso[0].id.toString());
		};
		$scope.eliminar = function(id) {
			location = '{% url "eliminarPaso" 101 102%}'.replace(/101/, $scope.proceso[0].id.toString()).replace(/102/, id.toString()); 
		};
		$scope.editar = function(id) {
			location = '{% url "editarPaso" 101 102%}'.replace(/101/, $scope.proceso[0].id.toString()).replace(/102/, id.toString());
		};
	});
</script>