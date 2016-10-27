<script>
	angularApp.controller('pasosController', function($scope, $http) {
		$scope.pasos = decodeEntities('{{ pasos }}');
		$scope.proceso = decodeEntities('{{ proceso }}');
		$scope.nuevo = function() {
			location = '{% url "nuevoPaso" 12345%}'.replace(/12345/, $scope.proceso[0].id.toString());
		};
		$scope.eliminar = function(id) {
			$http.post( '{% url "eliminarPaso" 12345%}'.replace(/12345/, $scope.proceso[0].id.toString()) ,
            {
                id : id,
                csrfmiddlewaretoken: $("[name = csrfmiddlewaretoken]").value
            }).success( function( data, status, headers, config ) {
                location.reload();
            }).error( function( ){
                
            });
		};
	});
</script>