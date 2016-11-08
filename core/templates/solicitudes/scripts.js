<script>
	angularApp.controller('solicitudesController', function($scope) {
	  	$scope.solicitudes = decodeEntities('{{ solicitudes }}');
	  	$scope.procesos = decodeEntities('{{ procesos }}');
	  	$scope.usuario = decodeEntities('{{ usuario }}');
	  	$scope.nuevaSolicitud = function(id) {
	  		location = '{% url "crearSolicitud" 101%}'.replace(/101/, id.toString());
	  	};
	  	$scope.abrirSolicitud = function(id) {
	  		location = '{% url "formulario" 101%}'.replace(/101/, id.toString());
	  	};
	  	$scope.historicoSolicitud = function(id) {
	  		location = '{% url "historico" 101%}'.replace(/101/, id.toString());
	  	};

	  	$scope.fechaLegible = function(fecha) {
	  		date = decodeDates(fecha);
	  		return date[0]+'-'+date[1]+'-'+date[2];
	  	};
	});
</script>