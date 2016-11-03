<script>
	angularApp.controller('solicitudesController', function($scope) {
	  	$scope.solicitudes = decodeEntities('{{ solicitudes }}');
	  	$scope.procesos = decodeEntities('{{ procesos }}');
	  	$scope.usuario = decodeEntities('{{ usuario }}');
	  	$scope.nuevaSolicitud = function(id) {
	  		location = '{% url "crearSolicitud" 101%}'.replace(/101/, id.toString());
	  	}
	});
</script>