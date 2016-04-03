'use strict';
(function () {


  describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
      it('should run here few assertions', function () {

      });
    });
  });
})();
// 

function haveFun(activityName='gym', time=100){
    console.log(`today i will go ${activityName} for ${time} hours.`);
}

haveFun('bike',400);