<script>
	angularApp.controller('workflowListController', function($scope, $http) {
	  	$scope.procesos = decodeEntities('{{ procesos }}');
	  	$scope.cambiarEstado = function (idProceso,accion) {
			if (accion==true) { 
				location = '{% url "activarWorkflow" 101%}'.replace(/101/, idProceso.toString()); 
			}
			else {
				location = '{% url "desactivarWorkflow" 101%}'.replace(/101/, idProceso.toString());
			}
		};

	  	$scope.pasos = function(id){
	  		location = '{% url "verPasos" 101%}'.replace(/101/, id.toString());
	  	};

		$scope.editar = function(id) {
			location = '{% url "editarWorkflow" 101%}'.replace(/101/, id.toString());
		}
	});
</script>