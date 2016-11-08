<script>
	angularApp.controller('reporteOpenTicketController', function($scope) {
		//Definir Variables
	  	var openTicket = 0,
	  		closeTicket = 0,
	  		porcenOpen = 0,
	  		porcenClose = 0,
	  		diasTicket = new Array(),
	  		diferentesDias = new Array('0'),
	  		numeroDias = new Array('0'),
	  		sumatoriaDias = 0,
	  		promedioDias = 0,
	  		idTicket = new Array('0'),
	  		duracionTicket = new Array('0');
	  	//Recibir Informacion desde python
	  	$scope.solicitudes = decodeEntities('{{ solicitudes }}');
	  	//Función para imprimir la fecha de mejor forma
	  	$scope.fechaLegible = function(fecha) {
	  		if (typeof fecha == 'undefined' || fecha == null) {
	  			return 'Sin terminar';
	  		}
	  		date = decodeDates(fecha);
	  		return date[0]+'-'+date[1]+'-'+date[2];
	  	};
	  	//Ciclo para calcular los valores de las graficas
	  	$scope.solicitudes.forEach(function(entry) {
	  		//Suma de tickets abiertos y cerrados
			if (entry.respuesta!='') {
				closeTicket ++; 
			}
			else {
				openTicket ++;
			}
			//Cantidades de tickets abiertos por la misma cantidad de días
			if (typeof diasTicket[entry.dias]  == 'undefined') {
				diasTicket[entry.dias] = 1;
			}
			else {
				diasTicket[entry.dias] ++;
			}
			//Sumatoria de días
			sumatoriaDias += entry.dias;
			//Listado de tickets y sus días
			idTicket.push('Solicitud #'+entry.id);
  			duracionTicket.push(entry.dias);
		});
		//Valores relacionados a los porcentajes de la grafica de pie
		porcenOpen = openTicket*100/(openTicket+closeTicket);
		porcenClose = closeTicket*100/(openTicket+closeTicket);
	  	$scope.labelsPie = ['Abiertos ' + porcenOpen + '% ', 'Cerrados ' + porcenClose + '% '];
  		$scope.dataPie = [openTicket, closeTicket];
  		$scope.colorsPie = ['#E13232', '#10CD5E'];
  		//Valores relacionados a la grafica de solicitudesXdias
  		diasTicket.forEach(function(entry,index) {
  			diferentesDias.push(index + ' Días ');
  			numeroDias.push(entry);
  		});
		$scope.labelsDias = diferentesDias;
		$scope.dataDias = numeroDias;
		//Valores relacionados a la duracion de los tickets
  		promedioDias = sumatoriaDias/$scope.solicitudes.length;
		idTicket.push('Promedio');
		duracionTicket.push(promedioDias);
		$scope.labelsTicketDuracion = idTicket;
		$scope.dataTicketDuracion = duracionTicket;
	});
</script>