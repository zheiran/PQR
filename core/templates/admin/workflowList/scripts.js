<script>
	angularApp.controller('workflowListController', function($scope, $http) {
	  	$scope.procesos = decodeEntities('{{ procesos }}');
	  	$scope.pasos = function(id){
	  		location = '{% url "verPasos" %}';
	  	};
	});
</script>