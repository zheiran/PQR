<script>
	angularApp.controller('nuevoWorkflowController', function($scope, $sce) {
		$scope.usuarios = decodeEntities('{{ usuarios }}');
	});
</script>