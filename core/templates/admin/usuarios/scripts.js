<script>
	angularApp.controller('usuarioController', function($scope) {
	  	$scope.usuarios = decodeEntities('{{ usuarios }}');
	  	$scope.nuevo = function() {
			location = '{% url "nuevoUsuario" %}';
		};
		$scope.eliminar = function(id) {
			location = '{% url "eliminarUsuario" 101%}'.replace(/101/, id.toString());
		};
		$scope.editar = function(id) {
			location = '{% url "editarUsuario" 101%}'.replace(/101/, id.toString());
		};
		$scope.activar = function (id) {
			location = '{% url "activarUsuario" 101%}'.replace(/101/, id.toString());
		}
	});
</script>