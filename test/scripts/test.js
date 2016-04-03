'use strict';

(function () {

  describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
      it('should run here few assertions', function () {});
    });
  });
})();
//

function haveFun() {
  var activityName = arguments.length <= 0 || arguments[0] === undefined ? 'gym' : arguments[0];
  var time = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

  console.log('today i will go ' + activityName + ' for ' + time + ' hours.');
}

haveFun('bike', 400);
//# sourceMappingURL=test.js.map
