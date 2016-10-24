<script>
	angularApp.controller('workflowListController', function($scope) {
	  	$scope.procesos = decodeEntities('{{ procesos }}');
	});
</script>