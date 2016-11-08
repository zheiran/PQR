<script>
	angularApp.controller('reporteOpenTicketController', function($scope) {
	  	var openTicket = 0,
	  		closeTicket = 0,
	  		porcenOpen = 0,
	  		porcenClose = 0;
	  	$scope.solicitudes = decodeEntities('{{ solicitudes }}');
	  	$scope.fechaLegible = function(fecha) {
	  		if (typeof fecha == 'undefined' || fecha == null) {
	  			return 'Sin terminar';
	  		}
	  		date = decodeDates(fecha);
	  		return date[0]+'-'+date[1]+'-'+date[2];
	  	};
	  	$scope.solicitudes.forEach(function(entry) {
			if (entry.respuesta!='') {
				closeTicket += 1; 
			}
			else {
				openTicket += 1;
			}
		});
		porcenOpen = openTicket*100/(openTicket+closeTicket);
		porcenClose = closeTicket*100/(openTicket+closeTicket);
	  	$scope.labels = ['Abiertos ' + porcenOpen + '% ', 'Cerrados ' + porcenClose + '% '];
  		$scope.data = [openTicket, closeTicket];
  		$scope.colors = ['#E13232', '#10CD5E'];
	});
</script>