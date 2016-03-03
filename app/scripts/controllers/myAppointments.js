'use strict';

/**
 * @ngdoc function
 * @name babylonApp.controller:MyAppointmentsCtrl
 * @description
 * # MyAppointmentsCtrl
 * Controller of the babylonApp
 */
angular.module( 'babylonApp' )
    .controller( 'MyAppointmentsCtrl', [ '$http', function( $http ) {

        // This should be fetched from session or url
        var userId = 4966108;
        var that = this;

        $http.get( 'api/appointments/' + userId ).then( function( appointments ) {
            that.list = appointments.data;
        } );

    } ] );
