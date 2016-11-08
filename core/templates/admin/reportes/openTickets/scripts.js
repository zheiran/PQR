<script>
	angularApp.controller('reporteOpenTicketController', function($scope) {
	  	$scope.solicitudes = decodeEntities('{{ solicitudes }}');
	});
</script>