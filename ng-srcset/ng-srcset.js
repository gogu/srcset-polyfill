var demoApp = angular.module('demoapp', []);

demoapp.directive('ggSrcset', ['$window', function($window) {
  var ratio = Math.ceil($window.devicePixelRatio || 1)
  , hasSrcset = 'srcset' in new Image();

  function _parse(setString) {
    var list = setString.split(',')
    , ret = {}
    , item;

    list.forEach(function(val) {
      item = val.trim().split(/\s+/);

      if (!item[1]) {
        ret[0] = item[0];
        return;
      }
      ret[parseInt(item[1])] = item[0];
    });

    return ret;
  }

  return {
    link: function(scope, $el, attrs) {
      var srcset = attrs.ggSrcset
      , srcList = _parse(srcset)
      , ra = ratio;

      if (hasSrcset) {
        attrs.$set('srcset', srcset);
        return;
      }

      while(!srcList[ra] && ra > 0) --ra;
      attrs.$set('src', srcList[ra]);
    }
  };
}])
