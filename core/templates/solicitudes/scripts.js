<script>
	angularApp.controller('solicitudesController', function($scope) {
	  	$scope.solicitudes = decodeEntities('{{ solicitudes }}');
	  	$scope.procesos = decodeEntities('{{ procesos }}');
	  	$scope.usuario = decodeEntities('{{ usuario }}');
	  	console.log($scope.solicitudes);
	  	$scope.nuevaSolicitud = function(id) {
	  		location = '{% url "crearSolicitud" 101%}'.replace(/101/, id.toString());
	  	};
	  	$scope.abrirSolicitud = function(id) {
	  		location = '{% url "formulario" 101%}'.replace(/101/, id.toString());
	  	};
	});
</script>