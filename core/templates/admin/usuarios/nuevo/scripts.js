<script>
	angularApp.controller('nuevoUsuarioController', function($scope) {
		$scope.volver = function () {
			location = '{% url "verUsuarios" %}';
		};
	});
</script>