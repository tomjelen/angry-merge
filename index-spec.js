'use strict';
var expect = require('chai').expect;
var angryMerge = require('./index');

describe('angry merge', function() {

  it('only overwrites the specified fields', function() {

    var source = {
      a: 'a',
      b: 'b',
      nested: {
        a: 'aa',
        b: 'bb'
      }
    };

    var specifiedData = {
      a: 'x',
      nested: {
        a: 'xx'
      }
    };

    var expected = {
      a: 'x',
      b: 'b',
      nested: {
        a: 'xx',
        b: 'bb'
      }
    };

    var merged = angryMerge(source, specifiedData);
    expect(merged).to.deep.equal(expected);
  });

  it('throws when unknown fields are specified', function() {
    var doMerge = function() {
      angryMerge({ a: 'a' }, { x: 'x' });
    };

    expect(doMerge).to.throw();
  });

  createExamples().forEach(function(example) {

    it('matches example: ' + example.name, function() {
      var merged = angryMerge(example.defaultData, example.specifiedData);
      expect(merged).to.deep.equal(example.expected);
    });

  });

});

function createExamples() {
  return [
    {
      name: 'flat objects',
      defaultData: {
        a: 'a',
        b: 'b'
      },
      specifiedData: {
        a: 'x'
      },
      expected: {
        a: 'x',
        b: 'b'
      }
    },
    {
      name: 'nesting - simple',
      defaultData: {
        a: 'a',
        b: 'b',
        nested: {
          aa: 'aa',
          bb: 'bb'
        }
      },
      specifiedData: {
        a: 'x',
        nested: {
          aa: 'xx'
        }
      },
      expected: {
        a: 'x',
        b: 'b',
        nested: {
          aa: 'xx',
          bb: 'bb'
        }
      }
    },
    {
      name: 'nesting - no specification for the nested props',
      defaultData: {
        a: 'a',
        nested: {
          aa: 'aa'
        }
      },
      specifiedData: {
        a: 'x'
      },
      expected: {
        a: 'x',
        nested: {
          aa: 'aa'
        }
      }
    },
    {
      name: 'nesting - only the nested props has specification',
      defaultData: {
        a: 'a',
        nested: {
          aa: 'aa'
        }
      },
      specifiedData: {
        nested: {
          aa: 'xx'
        }
      },
      expected: {
        a: 'a',
        nested: {
          aa: 'xx'
        }
      }
    }
  ];
}
