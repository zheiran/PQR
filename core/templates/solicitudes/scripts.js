<script>
	angularApp.controller('solicitudesController', function($scope) {
	  	$scope.solicitudes = decodeEntities('{{ solicitudes }}');
	  	$scope.procesos = decodeEntities('{{ procesos }}');
	  	$scope.usuario = decodeEntities('{{ usuario }}');
	});
</script>