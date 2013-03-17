/**
 * @fileOverview Test the events API
 */
goog.provide('app.test.event.api');


describe('Events API', function(){

  beforeEach(function() {
  });
  afterEach(function() {
    appOne.removeAllListeners();
  });

  it('should listen and trigger arbitrary events', function(done){
    function cb () {
      done();
    }
    appOne.listen('custom.event', cb);
    appOne.trigger('custom.event');
  });

  it('should cancel execution if listener executes preventDefault', function(done){
    function cb (eventObj) {
      eventObj.preventDefault();
    }
    appOne.listen('custom.event', cb);
    expect(appOne.trigger('custom.event')).to.be.false;
    done();
  });

  it('should cancel execution if listener returns false', function(done){
    function cb (eventObj) {
      return false;
    }
    appOne.listen('custom.event', cb);
    expect(appOne.trigger('custom.event')).to.be.false;
    done();
  });

  it('should allow for binding of selfObj', function(done){
    var obj = {
      a: 1
    };
    function cb (eventObj) {
      expect(this.a).to.be.equal(1);
      done();
    }
    appOne.listen('custom.eventTwo', cb, obj);
    appOne.trigger('custom.eventTwo');
  });

  it('should paappOne parameters from trigger', function(done){
    function cb (eventObj) {
      expect(eventObj.arg1).to.be.equal(1);
      expect(eventObj.arg2).to.be.equal(2);
      done();
    }
    appOne.listen('custom.eventThree', cb);
    var eventObj = {
      type: 'custom.eventThree',
      arg1: 1,
      arg2: 2
    };
    appOne.trigger(eventObj);
  });

  it('should remove listeners', function(){
    var cid = appOne.listen('custom.eventFour', function(){
      // should never be here
      expect(false).to.be.true;
    });

    appOne.unlisten(cid);
    appOne.trigger('custom.eventFour');
    expect(true).to.be.true;
  });

  it('should remove all listeners', function(){
    function cb () {
      // should never be here
      expect(false).to.be.true;
    }

    appOne.listen('custom.eventFive', cb);
    appOne.listen('custom.eventFive', cb);
    appOne.listen('custom.eventSix', cb);
    appOne.listen('custom.eventSeven', cb);

    var n = appOne.removeAllListeners();
    appOne.trigger('custom.eventFive');
    expect(true).to.be.true;
  });

});
