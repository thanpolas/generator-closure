
goog.provide('app.test.helpers');

goog.require('ssd.helpers');

suite('ssd.helpers', function() {

  test('isjQ', function(){
    var jq = $('<div></div>');
    var notjQ = new Array('2');

    assert.ok(ssd.isjQ(jq), 'A jQuery array');
    assert.ok(!ssd.isjQ(notjQ), 'Not a jQuery array');
  });


  test('ssd.arFind', function() {
    var arOne = [{id:1}, {id:2}, {id:3}, {id:4}, {id:5}];
    var arTwo = [{fruit:'apples'}, {fruit:'oranges'}, {fruit:'grapes'}, {fruit:'bananas'}];

    assert.equal(ssd.arFind(arOne, 'id', 3).id, 3, 'Searching with numeric value');
    assert.equal(ssd.arFind(arTwo, 'fruit', 'bananas').fruit, 'bananas', 'Searching with string value');
    assert.equal(ssd.arFind(arOne, 'id', 9), null, 'Search yields no result, we expect null');
    assert.equal(ssd.arFind(arOne, 'idid', 9), null, 'Bogus key, we expect null');

    var obj = ssd.arFind(arTwo, 'fruit', 'oranges');
    obj.fruit = 'mango';
    assert.notEqual(arTwo[2].fruit, obj.fruit, 'Returned objects are not references');
  });

  test('ssd.arFindIndex', function() {
    var arOne = [{id:1}, {id:2}, {id:3}, {id:4}, {id:5}];
    var arTwo = [{fruit:'apples'}, {fruit:'oranges'}, {fruit:'grapes'}, {fruit:'bananas'}];

    assert.equal(ssd.arFindIndex(arOne, 'id', 3), 2, 'Searching with numeric value');
    assert.equal(ssd.arFindIndex(arTwo, 'fruit', 'bananas'), 3, 'Searching with string value');
    assert.equal(ssd.arFindIndex(arOne, 'id', 9), -1, 'Search yields no result, we expect -1');
    assert.equal(ssd.arFindIndex(arOne, 'idid', 9), -1, 'Bogus key, we expect -1');
  });


  test('ssd.arRemove', function(){
    var arOne = [{id:1}, {id:2}, {id:3}, {id:4}, {id:5}];
    var arTwo = [{fruit:'apples'}, {fruit:'oranges'}, {fruit:'grapes'}, {fruit:'bananas'}];

    assert.ok(ssd.arRemove(arOne, 'id', 3), 'arRemove run normaly returns true');
    assert.ok(!ssd.arRemove('not an array', 'id', 3), 'arRemove with a string instead of array returns false');
    assert.ok(!ssd.arRemove(arOne, 'wrongKey', 3), 'Using a wrong key returns false');
    assert.ok(!ssd.arRemove(arOne, [1, 2, 3], 3), 'Using an array as a key returns false');

    assert.equal(arOne.length, 4, 'Our array\'s length now should be 4');
  });

});
