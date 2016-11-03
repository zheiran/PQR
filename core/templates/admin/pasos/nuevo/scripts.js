<script>
	angularApp.controller('nuevoPasoController', function($scope) {
		$scope.usuarios = decodeEntities('{{ usuarios }}');
		$scope.proceso 	= decodeEntities('{{ proceso }}');
		document.nuevoPaso.action = '{% url "nuevoPaso" 101%}'.replace(/101/, $scope.proceso[0].id.toString());
		$scope.guardar = function() {
			document.nuevoPaso.submit();
		};
	});
</script>