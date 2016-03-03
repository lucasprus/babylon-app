'use strict';

describe('Controller: AlertmessagesCtrl', function () {

  // load the controller's module
  beforeEach(module('babylonApp'));

  var AlertmessagesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlertmessagesCtrl = $controller('AlertmessagesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AlertmessagesCtrl.awesomeThings.length).toBe(3);
  });
});
