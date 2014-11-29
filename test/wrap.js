var assert = require('assert');
var sinon = require('sinon');
var wrap = require('..').wrap;
var _ = require('lodash');

describe('wrap', function() {
    it('Should always return a function', function() {
        assert(_.isFunction(wrap()));
    });

    it('Should proxy arguments to the body of the function', function (done) {
        wrap(function(a, b, cb) {
            assert.equal('arg1', a);
            assert.equal(2, b);
            cb();
        }, 10)('arg1', 2, done);
    });

    it('Should proxy the callback with arguments', function (done) {
        wrap(function(cb) {
            cb(null, 'a', 2.3);
        }, 10)(function(err, a, b) {
            assert.ifError(err);
            assert.equal('a', a);
            assert.equal(2.3, b);
            done();
        });
    });
    it('Should call the callback with an error if the callback is not called fast enough', function(done) {
        wrap(function(cb) {

        }, 10)(function(err) {
            assert(_.isObject(err));
            done();
        });
    });
    it('Should not call the callback twice even if there was a timeout', function(done) {
        var stub = sinon.stub();

        wrap(function(cb) {
            setTimeout(function() {
                cb();
                assert(stub.calledOnce);
                assert(_.isObject(stub.firstCall.args[0]));
                done();
            }, 30);
        }, 10)(stub);
    });
});