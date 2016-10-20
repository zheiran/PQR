<script>
	angularApp.controller('nuevoWorkflowController', function($scope, $sce) {
	  	$scope.workflow = JSON.parse(decodeEntities('{{ workflow }}'));
	  	console.log($scope.workflow);
	});
</script>