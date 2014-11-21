$(document).ready(function() {
  $('img[srcset]').srcset();
});

~ function() {
  var ratio = Math.ceil(window.devicePixelRatio || 1)
    , hasSrcset = 'srcset' in new Image();

  function _parse(setString) {
    var list = setString.split(',')
      , ret = {}
      , item;

    list.forEach(function(val) {
      item = $.trim(val).split(/\s+/);

      if (!item[1]) {
        ret[0] = item[0];
        return;
      }
      ret[parseInt(item[1])] = item[0];
    });

    return ret;
  }

  $.fn.srcset = function() {
    if (hasSrcset) return;

    return $(this).each(function(index, el) {
      var $el = $(el)
        , srcset = $el.attr('srcset')
        , srcList = _parse(srcset)
        , ra = ratio;
    
      while(!srcList[ra]) --ra;
      $el.attr('src', srcList[ra]);
    });
  }
}(jQuery);
