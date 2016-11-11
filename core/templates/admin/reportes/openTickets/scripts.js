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
	  	
	  	//Funcion para Calcular los días habiles entre fechas
		function getBusinessDateCount (startDate, endDate) {
			var elapsed, daysBeforeFirstSaturday, daysAfterLastSunday;
			var ifThen = function (a, b, c) {
				return a == b ? c : a;
			};

			elapsed = endDate - startDate;
			elapsed /= 86400000;

			daysBeforeFirstSunday = (7 - startDate.getDay()) % 7;
			daysAfterLastSunday = endDate.getDay();

			elapsed -= (daysBeforeFirstSunday + daysAfterLastSunday);
			elapsed = (elapsed / 7) * 5;
			elapsed += ifThen(daysBeforeFirstSunday - 1, -1, 0) + ifThen(daysAfterLastSunday, 6, 5);

			return Math.ceil(elapsed);
		}

		function days_between(date1, date2) {
			
			// The number of milliseconds in one day
			var ONE_DAY = 1000 * 60 * 60 * 24

			// Convert both dates to milliseconds
			var date1_ms = date1.getTime()
			var date2_ms = date2.getTime()

			// Calculate the difference in milliseconds
			var difference_ms = Math.abs(date1_ms - date2_ms)


			//Calcular fines de semana
			var diasLibres = 0;

			for (var i = date1; i <= date2; ){
				if (i.getDay() == 0 || i.getDay() == 6){
					diasLibres++;
				}
				i.setTime(i.getTime() + 1000*60*60*24);
			}

			// Convert back to days and return
			return Math.round(difference_ms/ONE_DAY)+1-diasLibres

		}
		
	  	//Recibir Informacion desde python
	  	$scope.solicitudes = decodeEntities('{{ solicitudes }}');
	  	console.log($scope.solicitudes);
	  	//Función para imprimir la fecha de mejor forma
	  	$scope.fechaLegible = function(fecha) {
	  		if (typeof fecha == 'undefined' || fecha == null) {
	  			return 'Sin terminar';
	  		}
	  		date = decodeDates(fecha);
	  		return date[0]+'-'+date[1]+'-'+date[2];
	  	};
	  	//Ciclo para calcular los valores de las graficas
	  	$scope.solicitudes.forEach(function(entry, index) {
	  		if ( entry.fecha_fin == 'undefined' || entry.fecha_fin == null) {
	  			var fecha_inicio = decodeDates(entry.fecha_inicio);
	  			var date1 = new Date(fecha_inicio[0], fecha_inicio[1]-1, fecha_inicio[2], fecha_inicio[3], fecha_inicio[4]),
	  				date2 = new Date(2016,10,12);
				var diasHabiles = days_between(date1, date2);
				$scope.solicitudes[index].dias = diasHabiles;
	  		} else {
	  			var fecha_inicio = decodeDates(entry.fecha_inicio),
	  				fecha_fin = decodeDates(entry.fecha_fin);
	  			var date1 = new Date(fecha_inicio[0], fecha_inicio[1]-1, fecha_inicio[2], fecha_inicio[3], fecha_inicio[4]),
	  				date2 = new Date(fecha_fin[0], fecha_fin[1]-1, fecha_fin[2], fecha_fin[3], fecha_fin[4]);
				var diasHabiles = days_between(date1, date2);
				$scope.solicitudes[index].dias = diasHabiles;
	  		}

	  		//Suma de tickets abiertos y cerrados
			if (entry.respuesta!='') {
				closeTicket ++; 
			}
			else {
				openTicket ++;
			}
			//Cantidades de tickets abiertos por la misma cantidad de días
			if (typeof diasTicket[diasHabiles]  == 'undefined') {
				diasTicket[diasHabiles] = 1;
			}
			else {
				diasTicket[diasHabiles] ++;
			}
			//Sumatoria de días
			sumatoriaDias += diasHabiles;
			//Listado de tickets y sus días
			idTicket.push('Solicitud #'+entry.id);
  			duracionTicket.push(diasHabiles);
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