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
    appOne.on('custom.event', cb);
    appOne.trigger('custom.event');
  });

  it('should cancel execution if listener executes preventDefault', function(done){
    function cb (eventObj) {
      eventObj.preventDefault();
    }
    appOne.on('custom.event', cb);
    expect(appOne.trigger('custom.event')).to.be.false;
    done();
  });

  it('should cancel execution if listener returns false', function(done){
    function cb (eventObj) {
      return false;
    }
    appOne.on('custom.event', cb);
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
    appOne.on('custom.eventTwo', cb, obj);
    appOne.trigger('custom.eventTwo');
  });

  it('should paappOne parameters from trigger', function(done){
    function cb (eventObj) {
      expect(eventObj.arg1).to.be.equal(1);
      expect(eventObj.arg2).to.be.equal(2);
      done();
    }
    appOne.on('custom.eventThree', cb);
    var eventObj = {
      type: 'custom.eventThree',
      arg1: 1,
      arg2: 2
    };
    appOne.trigger(eventObj);
  });

  it('should remove listeners', function(){
    var cid = appOne.on('custom.eventFour', function(){
      // should never be here
      expect(false).to.be.true;
    });

    appOne.removeListener(cid);
    appOne.trigger('custom.eventFour');
    expect(true).to.be.true;
  });

  it('should remove all listeners', function(){
    function cb () {
      // should never be here
      expect(false).to.be.true;
    }

    appOne.on('custom.eventFive', cb);
    appOne.on('custom.eventFive', cb);
    appOne.on('custom.eventSix', cb);
    appOne.on('custom.eventSeven', cb);

    var n = appOne.removeAllListeners();
    appOne.trigger('custom.eventFive');
    expect(true).to.be.true;
  });

});
