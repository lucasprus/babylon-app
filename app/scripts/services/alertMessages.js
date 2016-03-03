'use strict';

/**
 * @ngdoc service
 * @name babylonApp.AlertMessages
 * @description
 * # AlertMessages
 * Factory in the babylonApp.
 */
angular.module( 'babylonApp' )
    .factory( 'AlertMessages', [ '$timeout', function( $timeout ) {
        var alerts = [];

        function Alert( data ) {
            this.type = data.type;
            this.message = data.message;
        }

        Alert.prototype.dismiss = function() {
            alerts.splice( alerts.indexOf( this ), 1 );
        };

        return {
            alerts: alerts,
            push: function() {
                var alert, i = 0, l = arguments.length;

                function timeoutFunction( alert ) {
                    return function() {
                        alert.dismiss();
                    };
                }

                for ( ; i < l; i += 1 ) {
                    alert = new Alert( arguments[i] );
                    alerts.push( alert );
                    $timeout( timeoutFunction( alert ), 3000 );
                }
            }
        };

    } ] );
