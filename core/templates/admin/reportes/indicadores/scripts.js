<script>
	angularApp.controller('reporteOpenTicketController', function($scope) {
		//Definir Variables
	  	var diasUsadosProceso = new Array(),
	  		numeroDeProcesos = new Array(),
	  		valorEsperadoProcesos = new Array('0'),
	  		diferentesProcesos = new Array('0'),
	  		nombreProcesos = new Array('0'),
	  		promedioDiasProceso = new Array('0');
	  	
	  	//Funcion para Calcular los días habiles entre fechas
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
	  		//proceso para calcular los días hábiles
	  		if ( entry.fecha_fin == 'undefined' || entry.fecha_fin == null) {
	  			var fecha_inicio = decodeDates(entry.fecha_inicio);
	  			var date1 = new Date(fecha_inicio[0], fecha_inicio[1]-1, fecha_inicio[2], fecha_inicio[3], fecha_inicio[4]),
	  				date2 = new Date();
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

	  		//Sumatoria de días habiles y usados
	  		if (typeof diasUsadosProceso[$scope.solicitudes[index].procesoid]  == 'undefined') {
				diasUsadosProceso[$scope.solicitudes[index].procesoid] = $scope.solicitudes[index].dias;
				numeroDeProcesos[$scope.solicitudes[index].procesoid] = 1;
				valorEsperadoProcesos.push($scope.solicitudes[index].esperado);
				diferentesProcesos.push('Proceso #'+$scope.solicitudes[index].procesoid);
				nombreProcesos.push($scope.solicitudes[index].proceso);
			}
			else {
				diasUsadosProceso[$scope.solicitudes[index].procesoid] += $scope.solicitudes[index].dias;
				numeroDeProcesos[$scope.solicitudes[index].procesoid] ++;
			}
		});


		diasUsadosProceso.forEach(function(entry,index) {
  			promedioDiasProceso.push((diasUsadosProceso[index]/numeroDeProcesos[index]).toFixed(2));
  		});
		$scope.seriesPromedioDuraciones = ['Promedio Días Utilizados', 'Días Esperados'];
		$scope.labelsPromedioDuraciones = diferentesProcesos;
		$scope.nombresPromedioDuraciones = nombreProcesos;
		$scope.dataPromedioDuraciones = [promedioDiasProceso,valorEsperadoProcesos];
		$scope.optionsPromedioDuraciones = { legend: { display: true } };
	});
</script>