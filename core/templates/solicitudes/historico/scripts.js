<script>
	angularApp.controller('historicoController', function($scope, $uibModal) {
	  	$scope.logs = decodeEntities('{{ logs }}');
	  	$scope.solicitud = decodeEntities('{{ solicitud }}');

	  	$scope.fechaLegible = function(fecha) {
	  		if (typeof fecha == "undefined") {
	  			return 'Sin Responder...';
	  		}
	  		date = decodeDates(fecha);
	  		if (date[3] !== undefined) {
	  			return date[0]+'-'+date[1]+'-'+date[2]+' '+date[3]+':'+date[4];
	  		}else{
	  			return date[0]+'-'+date[1]+'-'+date[2];
	  		}
	  	};
	  	$scope.volver = function () {
			location = '{% url "home" %}';
		};
	});
</script>