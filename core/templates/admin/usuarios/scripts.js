<script>
	angularApp.controller('usuarioController', function($scope) {
	  	$scope.usuarios = decodeEntities('{{ usuarios }}');
	  	$scope.nuevo = function() {
			location = '{% url "nuevoUsuario" %}';
		};
		$scope.eliminar = function(id) {
			location = '{% url "eliminarUsuario" 12345%}'.replace(/12345/, id.toString());
		};
		$scope.editar = function(id) {
			location = '{% url "editarUsuario" 12345%}'.replace(/12345/, id.toString());
		};
	});
</script>