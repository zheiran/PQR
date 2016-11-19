<script>
	angularApp.controller('nuevoWorkflowController', function($scope, $sce) {
		$scope.usuarios = decodeEntities('{{ usuarios }}');
		$scope.volver = function () {
			location = '{% url "workflowList" %}';
		};
	});
</script>