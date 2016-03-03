'use strict';

/**
 * @ngdoc function
 * @name babylonApp.controller:ModalInstanceCtrl
 * @description
 * # ModalInstanceCtrl
 * Controller of the babylonApp
 */
angular.module( 'babylonApp' )
    .controller( 'ModalInstanceCtrl', [ '$scope', '$uibModalInstance', 'items', 'selectedItem', function( $scope, $uibModalInstance, items, selectedItem ) {
        $scope.items = items;

        $scope.selected = {
            item: selectedItem
        };

        $scope.select = function( item ) {
            $uibModalInstance.close( item );
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss( 'cancel' );
        };
    } ] );
