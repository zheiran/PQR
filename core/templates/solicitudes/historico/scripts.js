<script>
	angularApp.controller('historicoController', function($scope, $uibModal) {
	  	$scope.logs = decodeEntities('{{ logs }}');
	  	$scope.solicitud = decodeEntities('{{ solicitud }}');
	  	$scope.encargado = 'asd';
	  	$scope.observacion = 'asdasd';
		$scope.open = function (log) {
			modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'detalleHistorico.html',
				controller: 'modalController',
				controllerAs: 'modalController',
				size: 'lg',
				resolve: {
					row: function () {
						return log;
					}
				}
			});

		};

	  	$scope.fechaLegible = function(fecha) {
	  		if (typeof fecha == "undefined") {
	  			return 'Sin Responder...';
	  		}
	  		date = decodeDates(fecha);
	  		return date[0]+'-'+date[1]+'-'+date[2];
	  	};
	});
	angularApp.controller('modalController', function($scope, $uibModal, $uibModalInstance, row) 	{
	  	$scope.row = row;

		$scope.close = function () {
			modalInstance.close();
		};
	});
</script>