module.exports = merge;

function merge(defaults, specifiedData) {

  var merged = {};

  for (var prop in defaults) {
    merged[prop] = specifiedData[prop] || defaults[prop];
  }

  if (isOverSpecified(defaults, specifiedData))
    throw new Error('angry!');

  return merged;
}

function isOverSpecified(defaults, specifiedData) {

  for (var prop in specifiedData) {
    if (!defaults[prop])
      return true;
  }

  return false;
}
