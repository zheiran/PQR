<script>
	angularApp.controller('historicoController', function($scope, $uibModal) {
	  	$scope.logs = decodeEntities('{{ logs }}');
	  	$scope.solicitud = decodeEntities('{{ solicitud }}');
	  	$scope.encargado = 'asd';
	  	$scope.observacion = 'asdasd';
		$scope.open = function (index) {
			$scope.loquesea = index;
			modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'detalleHistorico.html',
				controller: 'modalController',
				controllerAs: 'modalController',
				size: 'lg',
				resolve: {
					loquesea: function () {
						return $scope.loquesea;
					}
				}
			});

		};

	  	$scope.fechaLegible = function(fecha) {
	  		if (typeof fecha == "undefined") {
	  			return 'Sin Terminar...';
	  		}
	  		date = decodeDates(fecha);
	  		return date[0]+'-'+date[1]+'-'+date[2];
	  	};
	});
	angularApp.controller('modalController', function($scope, $uibModal, $uibModalInstance, loquesea) 	{
	  	$scope.loquesea = loquesea;

		$scope.close = function () {
			modalInstance.close();
		};
	});
</script>