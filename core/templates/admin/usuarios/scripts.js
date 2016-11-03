<script>
	angularApp.controller('usuarioController', function($scope) {
	  	$scope.usuarios = decodeEntities('{{ usuarios }}');
	  	$scope.nuevo = function() {
			location = '{% url "nuevoUsuario" %}';
		};
		$scope.eliminar = function(id) {
			location = '{% url "eliminarUsuario" 01%}'.replace(/01/, id.toString());
		};
		$scope.editar = function(id) {
			location = '{% url "editarUsuario" 01%}'.replace(/01/, id.toString());
		};
	});
</script>