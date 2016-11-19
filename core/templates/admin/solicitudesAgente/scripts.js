<script>
	angularApp.controller('solicitudesAgenteController', function($scope) {
	  	$scope.solicitudes = JSON.parse(decodeEntities('{{ solicitud }}'));
	  	console.log($scope.solicitudes);
	});
</script>