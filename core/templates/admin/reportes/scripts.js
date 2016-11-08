<script>
	angularApp.controller('reporteOpenTicketController', function($scope) {
	  	$scope.usuarios = decodeEntities('{{ usuarios }}');
	});
</script>