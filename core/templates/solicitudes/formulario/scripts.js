<script>
	angularApp.controller('formularioController', function($scope) {
	  	$scope.log = decodeEntities('{{ log }}');
	  	$scope.paso = decodeEntities('{{ paso }}');
	  	$scope.comentarios = $scope.log[0].fields.comentarios;
	  	$scope.mensaje = '';
	  	$scope.guardarEnviar = function() {
	  		if ($scope.comentarios !== null && $scope.comentarios !== '') {
	  			$scope.mensaje = '';
	  			document.formularioForm.action = '{% url "enviarFormulario" 101%}'.replace(/101/, $scope.log[0].pk.toString());
	  			document.formularioForm.submit();
	  		}else{
	  			$scope.mensaje = 'Este formulario no se puede enviar debido a que no ha relizado ningun comentario.';
	  		};
	  	};

	  	$scope.guardarDevolver = function() {
	  		if ($scope.comentarios !== null && $scope.comentarios !== '') {
	  			$scope.mensaje = '';
	  			document.formularioForm.action = '{% url "devolverFormulario" 101%}'.replace(/101/, $scope.log[0].pk.toString());
	  			document.formularioForm.submit();
	  		}else{
	  			$scope.mensaje = 'Este formulario no se puede devolver debido a que no ha relizado ningun comentario.';
	  		};
	  	};
	  	
	});
</script>