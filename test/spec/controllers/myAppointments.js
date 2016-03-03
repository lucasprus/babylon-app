'use strict';

describe('Controller: MyAppointmentsCtrl', function () {

  // load the controller's module
  beforeEach(module('babylonApp'));

  var MyAppointmentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyAppointmentsCtrl = $controller('MyAppointmentsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should have no appointments initially', function () {
    expect(MyAppointmentsCtrl.list).not.toBeDefined();
  });
});
