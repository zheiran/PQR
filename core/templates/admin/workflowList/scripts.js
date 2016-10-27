<script>
	angularApp.controller('workflowListController', function($scope, $http) {
	  	$scope.procesos = decodeEntities('{{ procesos }}');
	  	$scope.cambiarEstado = function (idProceso,accion) {
			if (accion==true) {
				console.log('true');
			}
		};
	  	$scope.pasos = function(id){
	  		location = '{% url "verPasos" 12345%}'.replace(/12345/, id.toString());
	  	};
	});
</script>