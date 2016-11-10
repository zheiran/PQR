<script>
	angularApp.controller('formularioController', function($scope) {
	  	$scope.log = decodeEntities('{{ log }}');
	  	$scope.paso = decodeEntities('{{ paso }}');
	  	$scope.comentarios = $scope.log[0].fields.comentarios;
	  	$scope.mensaje = '';
	  	$scope.comentarios_antiguos = decodeEntities('{{ comentarios_antiguos }}');
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

	  	$scope.fechaLegible = function(fecha) {
	  		if (typeof fecha == "undefined") {
	  			return 'Sin Responder...';
	  		}
	  		date = decodeDates(fecha);
	  		if (date[3] !== undefined) {
	  			return date[0]+'-'+date[1]+'-'+date[2]+' '+date[3]+':'+date[4];
	  		}else{
	  			return date[0]+'-'+date[1]+'-'+date[2];
	  		}
	  	};

	  	$scope.guardar = function() {
	  		if ($scope.comentarios !== null && $scope.comentarios !== '') {
	  			$scope.mensaje = '';
	  			document.formularioForm.action = '{% url "guardarFormulario" 101%}'.replace(/101/, $scope.log[0].pk.toString());
	  			document.formularioForm.submit();
	  		}else{
	  			$scope.mensaje = 'Este formulario no se puede guardar debido a que no ha relizado ningun comentario.';
	  		};
	  	}
	  	
	});
</script>