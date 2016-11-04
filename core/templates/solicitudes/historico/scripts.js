<script>
	angularApp.controller('historicoController', function($scope, $uibModal) {
	  	$scope.logs = decodeEntities('{{ logs }}');
	  	$scope.solicitud = decodeEntities('{{ solicitud }}');
	  	$scope.encargado = 'asd';
	  	$scope.observacion = 'asdasd';
		$scope.open = function (index) {
			modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'detalleHistorico.html',
				controller: 'historicoController',
				controllerAs: 'historicoController',
				size: 'lg'
			});

		};
		$scope.close = function () {
			modalInstance.close();
		};
	});
</script>