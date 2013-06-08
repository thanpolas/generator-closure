
goog.provide('app.test.core');

goog.require('app.test.fixture.event');

describe('Core API :: appOne()', function(){
  describe('appOne()', function(){
    it('should be a function', function(){
      expect( appOne ).to.be.an('function');
    });

    it('should have a listen method', function() {
      expect( appOne.on ).to.be.a('function');
    });

    it('should have an init method', function() {
      expect( appOne.init ).to.be.a('function');
    });

    it('should have an isReady method', function() {
      expect( appOne.isReady ).to.be.a('function');
    });

    it('should report a ready state of false', function(){
      expect( appOne.isReady() ).to.be.false;
    });
  });
  describe('Invoke appOne() and listen for all events and callbacks', function() {

    var appCallback = sinon.spy(),
        initEventCb     = sinon.spy(),
        stubSync   = sinon.stub( appOne.sync, 'send' ),
        appReturn;

    stubgetLoginStatus = sinon.stub(FB, 'getLoginStatus')
      .yields();


    describe('Executing appOne() and follow up ready methods', function() {

      it('should boot up the appOne and emit an init event', function(done){
        appOne.on(app.test.fixture.event.core.INIT, initEventCb);

        appReturn = appOne( appCallback );

        expect( appReturn.always ).to.be.a('function');

        window.fbAsyncInit();

        appReturn.always(appOne.removeAllListeners).always(function() {
          done();
        });
      });

      it('should have not made any sync calls', function() {
        expect( stubSync.called ).to.be.false;
        stubSync.restore();
      });

      it('should report a ready state of true', function(){
        expect( appOne.isReady() ).to.be.true;
      });

      it('should accept a callback that immediately invokes', function() {
        var spy = sinon.spy();
        appOne( spy );
        expect( spy.calledOnce ).to.be.true;
      });
    });

    //
    //
    // The returned promise
    //
    //
    describe('The returned promise', function() {
      it('should have a then method', function() {
        expect( appReturn.then ).to.be.a('function');
      });
      it('should have an otherwise method', function() {
        expect( appReturn.otherwise ).to.be.a('function');
      });
      it('should have a yield method', function() {
        expect( appReturn.yield ).to.be.a('function');
      });
      it('should have a spread method', function() {
        expect( appReturn.spread ).to.be.a('function');
      });

      it('should immediately invoke fullfilled using then', function() {
        var onFulfilled = sinon.spy(),
            onRejected = sinon.spy();
        appReturn.then( onFulfilled, onRejected );
        expect( onFulfilled.calledOnce ).to.be.true;
      });
      it('should not invoke rejected using then', function() {
        var onFulfilled = sinon.spy(),
            onRejected = sinon.spy();
        appReturn.then( onFulfilled, onRejected );
        expect( onRejected.called ).to.be.false;
      });
    });

    //
    //
    // init event
    //
    //
    describe('The init event', function() {
      it('should have triggered the init event', function() {
        expect( initEventCb.calledOnce ).to.be.true;
      });
    });

    //
    //
    // init callback
    //
    //
    describe('The init callback', function() {
      it('should have triggered the init callback', function() {
        expect( appCallback.calledOnce ).to.be.true;
      });
    });

  });
});
