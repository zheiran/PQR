<script>
	angularApp.controller('workflowListController', function($scope) {
	  	$scope.procesos = decodeEntities('{{ procesos }}');
	  	$scope.cambiarEstado = function (idProceso,accion) {
			if (accion==true) {
				console.log('true');
			}
		};
	});
</script>