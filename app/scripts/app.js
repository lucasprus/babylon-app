'use strict';

/**
* @ngdoc overview
* @name babylonApp
* @description
* # babylonApp
*
* Main module of the application.
*/
angular
    .module( 'babylonApp', [
        'ngAnimate',
        'ngCookies',
        'ngRoute',
        'ngSanitize',
        'ngMockE2E',
        'ui.bootstrap'
    ] )
    .config( [ '$routeProvider', function( $routeProvider ) {
        $routeProvider
            .when( '/', {
                templateUrl: 'views/main.html'
            } )
            .when( '/booking', {
                templateUrl: 'views/booking.html',
                controller: 'BookingCtrl',
                controllerAs: 'booking'
            } )
            .when( '/my-appointments', {
                templateUrl: 'views/myAppointments.html',
                controller: 'MyAppointmentsCtrl',
                controllerAs: 'myAppointments'
            } )
            .otherwise( {
                redirectTo: '/'
            } );
    } ] )
    .run( [ '$httpBackend', function( $httpBackend ) {

        // The mock data should be stored in separate files ideally
        var members = [
            {
                'name': {
                    'first': 'Wyatt',
                    'last': 'Hodge'
                },
                'image': 'C02.png'
            },
            {
                'name': {
                    'first': 'Dakota',
                    'last': 'Stuart'
                },
                'image': 'FE01.png'
            },
            {
                'name': {
                    'first': 'Finn',
                    'last': 'Martin'
                },
                'image': 'F04.png'
            },
            {
                'name': {
                    'first': 'Daryl',
                    'last': 'Wilson'
                },
                'image': 'B02.png'
            }
        ];

        var GPs = [
            {
                'id': 1,
                'name': {
                    'first': 'Gemma',
                    'last': 'Mccormick'
                },
                'nextSlot': 1466410485000
            },
            {
                'id': 2,
                'name': {
                    'first': 'Beverly',
                    'last': 'Crosby'
                },
                'nextSlot': 1443009691000
            },
            {
                'id': 3,
                'name': {
                    'first': 'Charissa',
                    'last': 'Savage'
                },
                'nextSlot': 1477463014000
            },
            {
                'id': 4,
                'name': {
                    'first': 'Kai',
                    'last': 'Noble'
                },
                'nextSlot': 1458257939000
            }
        ];

        var nurses = [
            {
                'id': 5,
                'name': {
                    'first': 'Noelani',
                    'last': 'Burch'
                },
                'nextSlot': 1470551270000
            },
            {
                'id': 6,
                'name': {
                    'first': 'Driscoll',
                    'last': 'Berg'
                },
                'nextSlot': 1462418247000
            },
            {
                'id': 7,
                'name': {
                    'first': 'Igor',
                    'last': 'Mccray'
                },
                'nextSlot': 1429590432000
            },
            {
                'id': 8,
                'name': {
                    'first': 'Moana',
                    'last': 'Oconnor'
                },
                'nextSlot': 1426535621000
            }
        ];

        var therapists = [
            {
                'id': 9,
                'name': {
                    'first': 'Darius',
                    'last': 'Vang'
                },
                'nextSlot': 1470264784000
            },
            {
                'id': 10,
                'name': {
                    'first': 'Christian',
                    'last': 'Eaton'
                },
                'nextSlot': 1490583323000
            },
            {
                'id': 11,
                'name': {
                    'first': 'Arsenio',
                    'last': 'Vega'
                },
                'nextSlot': 1474109296000
            }
        ];

        var specialists = [
            {
                'id': 12,
                'name': {
                    'first': 'Stephanie',
                    'last': 'Burks'
                },
                'nextSlot': 1465977685000
            },
            {
                'id': 13,
                'name': {
                    'first': 'Sage',
                    'last': 'Ortiz'
                },
                'nextSlot': 1437897831000
            },
            {
                'id': 14,
                'name': {
                    'first': 'Quinn',
                    'last': 'Moore'
                },
                'nextSlot': 1465779102000
            },
            {
                'id': 15,
                'name': {
                    'first': 'Gannon',
                    'last': 'Leon'
                },
                'nextSlot': 1480158194000
            },
            {
                'id': 16,
                'name': {
                    'first': 'Ferdinand',
                    'last': 'Reilly'
                },
                'nextSlot': 1478229626000
            }
        ];

        var availableSlots = [ 1437897831000, 1458257939000, 1490583323000 ];

        var myAppointments = [];

        // User's members
        $httpBackend.whenGET( 'api/members/4966108' ).respond( members );

        // Doctors by type
        $httpBackend.whenGET( 'api/doctors/gp' ).respond( GPs );
        $httpBackend.whenGET( 'api/doctors/nurse' ).respond( nurses );
        $httpBackend.whenGET( 'api/doctors/therapist' ).respond( therapists );
        $httpBackend.whenGET( 'api/doctors/specialist' ).respond( specialists );

        // Available appointment slots by doctor id
        // This needs to be changed for each doctor to match 'nextSlot' received from queries to doctor types above
        $httpBackend.whenGET( /^api\/slots/ ).respond( availableSlots );

        // Users' appointments
        $httpBackend.whenGET( 'api/appointments/4966108' ).respond( myAppointments );
        $httpBackend.whenPOST( 'api/appointments/4966108' ).respond( function( method, url, data ) {
            var appointment = angular.fromJson( data );
            myAppointments.push( appointment );
            return [ 200, appointment, {} ];
        } );

        $httpBackend.whenGET( /^views\// ).passThrough();
    } ] );
