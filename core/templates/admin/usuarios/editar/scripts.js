<script>
	angularApp.controller('editarUsuarioController', function($scope) {
		$scope.usuario = decodeEntities('{{ usuario }}');
		document.editarUsuario.action = '{% url "editarUsuario" 101 %}'.replace(/101/, $scope.usuario[0].id.toString());
		$scope.guardar = function() {
			document.editarUsuario.submit();
		};
		$scope.volver = function () {
			location = '{% url "verUsuarios" %}';
		};
	});
</script>