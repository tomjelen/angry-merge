var expect = require('chai').expect;
var angryMerge = require('./index');

describe('angry merge', function() {

  it('only overwrites specified fields', function() {
    var source = {
      a: 'a',
      b: 'b'
    };

    var merged = angryMerge(source, { a: 'x' });

    var expected = {
      a: 'x',
      b: 'b'
    };

    expect(merged).to.deep.equal(expected);
  });

  it('throws when unknown fields are specified', function() {
    var doMerge = function() {
      angryMerge({ a: 'a' }, { x: 'x' });
    };

    expect(doMerge).to.throw();
  });

});
