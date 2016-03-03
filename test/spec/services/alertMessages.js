'use strict';

describe('Service: AlertMessages', function () {

  // load the service's module
  beforeEach(module('babylonApp'));

  // instantiate service
  var AlertMessages;
  beforeEach(inject(function (_AlertMessages_) {
    AlertMessages = _AlertMessages_;
  }));

  it('should do something', function () {
    expect(!!AlertMessages).toBe(true);
  });

});
