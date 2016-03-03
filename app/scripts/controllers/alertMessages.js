'use strict';

/**
 * @ngdoc function
 * @name babylonApp.controller:AlertMessagesCtrl
 * @description
 * # AlertMessagesCtrl
 * Controller of the babylonApp
 */
angular.module( 'babylonApp' )
    .controller( 'AlertMessagesCtrl', [ '$scope', 'AlertMessages', function( $scope, AlertMessages ) {
        $scope.alerts = AlertMessages.alerts;
    } ] );
