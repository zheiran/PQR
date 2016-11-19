<script>
	angularApp.controller('editarWorkflowController', function($scope) {
		$scope.usuarios = decodeEntities('{{ usuarios }}');
		$scope.workflow = decodeEntities('{{ workflow }}');
		document.editarWorkflow.action = '{% url "editarWorkflow" 101%}'.replace(/101/, $scope.workflow[0].procesoid.toString());
		$scope.guardar = function() {
			document.editarWorkflow.submit();
		};
		$scope.volver = function () {
			location = '{% url "workflowList" %}';
		};
	});
</script>