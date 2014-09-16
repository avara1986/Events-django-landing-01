angular.module('events', ['eventService'])
.controller('eventController', ['$scope','$http', '$log', 'sharedEvent', function ($scope, $http, $log, sharedEvent) {
	/**
	 * Inicializar events
	 */
	$scope.events = {};
	/**
	 * AQUI SE DEFINE EL EVENTO QUE SE CARGAR� EN LA WEB
	 */
	$scope.events.id = 1;
	$http.get('http://events-drf.herokuapp.com/api/events/'+$scope.events.id).
    success(function(data, status, headers, config) {
        $scope.events = data;
        console.log($scope.events);
      }).
      error(function(data, status, headers, config) {
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
      });
	  $scope.setRegisterEvent = function(id, title) {
		  sharedEvent.id = id;
		  sharedEvent.title = title;
	  };
}]);

angular.module('formAttendee', [])
.controller('attendeeController', ['$scope','$http', '$log' , 'sharedEvent', function($scope, $http, $log, sharedEvent) {

	$scope.events = sharedEvent;
	/**
	 * Muestra si hubo un error en el env�o(false) o la confirmaci�n (true)
	 */
	$scope.result_register = false;
	/**
	 * Muestra el resultado del env�o
	 */
	$scope.finish_sending = false;
	/**
	 * Muestra mensaje de "se est� enviadno"
	 */
	$scope.is_sending_register = false;
	/**
	 * Inicializar attendee
	 */
	$scope.attendee = {};
	$scope.attendee.id = "";
	/**
	 * For tests
	 */
	$scope.attendee.name = "Alberto";
	$scope.attendee.surname = "test2";
	$scope.attendee.email = "test2@gmail.com";
	$scope.attendee.web = "test2.com";
    $scope.submit = function(attendee,event) {
    	console.log(event);
    	$scope.is_sending_register = true;
    	$scope.attendee = attendee;
    	$scope.attendee.event = event.id;
    	//attendee.event = event.id;
    	$http.post('http://events-drf.herokuapp.com/api/attendees/', $scope.attendee)
        .success(function(data) {
        	console.log(data);
        	$scope.is_sending_register = false;
        	$scope.finish_sending = true;
        	$scope.result_register = data.result;
        	$scope.result_error_msg = data.error_msg;
        	$scope.attendee = data;
        }).
        error(function(data, status, headers, config) {
        	$scope.is_sending_register = false;
        	$scope.finish_sending = true;
        	$scope.result_register = false;
        	$scope.result_error_msg = data;
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
        });
    }
	$scope.reset = function() {
		$scope.attendee = angular.copy($scope.master);
	};
}]);