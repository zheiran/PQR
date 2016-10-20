<script>
	angularApp.controller('workflowListController', function($scope) {
	  	$scope.workflow = decodeEntities('{{ workflow }}'); console.log($scope.workflow);
console.log($scope.workflow)
		$scope.edit = function(id) {
			console.log('el id es:'+id)
		};
	});
</script>