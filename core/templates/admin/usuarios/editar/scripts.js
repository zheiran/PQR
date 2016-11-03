<script>
	angularApp.controller('editarUsuarioController', function($scope) {
		$scope.usuario = decodeEntities('{{ usuario }}');
		document.editarUsuario.action = '{% url "editarUsuario" 01 %}'.replace(/01/, $scope.usuario[0].id.toString());
		$scope.guardar = function() {
			document.editarUsuario.submit();
		};
	});
</script>