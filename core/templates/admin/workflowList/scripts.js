<script>
	angularApp.controller('workflowListController', function($scope, $http) {
	  	$scope.procesos = decodeEntities('{{ procesos }}');
	  	$scope.cambiarEstado = function (idProceso,accion) {
			if (accion==true) {
				console.log('true');
			}
		};
	  	$scope.pasos = function(id){
	  		location = '{% url "verPasos" 01%}'.replace(/01/, id.toString());
	  	};
	});
</script>