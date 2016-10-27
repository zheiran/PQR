<script>
	angularApp.controller('nuevoPasoController', function($scope) {
		$scope.usuarios = decodeEntities('{{ usuarios }}');
		$scope.proceso 	= decodeEntities('{{ proceso }}');
		document.nuevoPaso.action = '{% url "nuevoPaso" 12345%}'.replace(/12345/, $scope.proceso[0].id.toString());
		$scope.guardar = function() {
			document.nuevoPaso.submit();
		};
	});
</script>