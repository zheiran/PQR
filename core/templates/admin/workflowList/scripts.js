<script>
	angularApp.controller('workflowListController', function($scope, $http) {
	  	$scope.procesos = decodeEntities('{{ procesos }}');
	  	$scope.cambiarEstado = function (idProceso,accion) {
			if (accion==true) {
				console.log('true');
			}
		};
	  	$scope.pasos = function(id){
	  		location = '{% url "verPasos" 101%}'.replace(/101/, id.toString());
	  	};
	});
</script>