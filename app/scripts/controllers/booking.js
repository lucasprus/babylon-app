'use strict';

/**
 * @ngdoc function
 * @name babylonApp.controller:BookingCtrl
 * @description
 * # BookingCtrl
 * Controller of the babylonApp
 */
angular.module( 'babylonApp' )
    .controller( 'BookingCtrl', [ '$scope', '$http', '$log', 'AlertMessages', '$uibModal', function( $scope, $http, $log, AlertMessages, $uibModal ) {

        // This should be fetched from session or url
        var userId = 4966108;

        var that = this;

        function getDoctors( type ) {
            $http.get( 'api/doctors/' + type ).then( function( doctors ) {
                doctors = doctors.data;

                doctors.sort( function( a, b ) {
                    return a.nextSlot - b.nextSlot;
                } );

                that.doctors = doctors;

                var selectedDoctor = doctors[0];
                that.selectedDoctor = selectedDoctor;
                that.selectedAppointment = selectedDoctor.nextSlot;
            } );
        }

        $scope.$watch( 'booking.selectedProfessional', function( newValue ) {
            $log.log( newValue );
            getDoctors( newValue.type );
        } );

        // This can also be fetched from API
        var professionals = [
            {
                'type': 'gp',
                'image': 'B01.png'
            },
            {
                'type': 'nurse',
                'image': 'C01.png'
            },
            {
                'type': 'therapist',
                'image': 'FB03.png'
            },
            {
                'type': 'specialist',
                'image': 'FC04.png'
            }
        ];

        this.professionals = professionals;
        this.selectedProfessional = professionals[0];

        // Fetch user's members
        $http.get( 'api/members/' + userId ).then( function( members ) {
            members = members.data;

            that.members = members;
            that.selectedMember = members[0];
        } );

        this.openDoctorsModal = function() {
            var modalInstance = $uibModal.open( {
                templateUrl: 'views/doctorsModal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    items: function() {
                        return that.doctors;
                    },
                    selectedItem: function() {
                        return that.selectedDoctor;
                    }
                }
            } );

            modalInstance.result.then( function( selectedItem ) {
                that.selectedDoctor = selectedItem;
                that.selectedAppointment = selectedItem.nextSlot;
                $log.log( selectedItem.nextSlot );
            }, function() {
                $log.info( 'Modal dismissed at: ' + new Date() );
            } );
        };

        this.openAppointmentsModal = function() {
            var modalInstance = $uibModal.open( {
                templateUrl: 'views/appointmentsModal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    items: [ '$http', function( $http ) {
                        return $http.get( 'api/slots/' + that.selectedDoctor.id ).then( function( appointments ) {
                            return appointments.data;
                        } );
                    } ],
                    selectedItem: function() {
                        return that.selectedAppointment;
                    }
                }
            } );

            modalInstance.result.then( function( selectedItem ) {
                that.selectedAppointment = selectedItem;
            }, function() {
                $log.info( 'Modal dismissed at: ' + new Date() );
            } );
        };

        this.book = function() {
            $http.post( 'api/appointments/' + userId, {
                member: that.selectedMember.name.first + ' ' + that.selectedMember.name.last,
                doctor: that.selectedDoctor.name.first + ' ' + that.selectedDoctor.name.last,
                date: that.selectedAppointment
            } ).then( function() {
                AlertMessages.push( {
                    type: 'success',
                    message: 'Appointment successfully booked'
                } );
            } );
        };

    } ] );
