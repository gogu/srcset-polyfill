~ function() {
  var ratio = Math.ceil(window.devicePixelRatio || 1)
    , hasSrcset = 'srcset' in new Image();

  // srcset 解析
  function _parse(setString) {
    var list = setString.split(',')
      , ret = {}
      , item;

    $.each(list, function(index, val) {
      item = $.trim(val).split(/\s+/);

      if (!item[1]) {
        ret[0] = item[0];
        return;
      }
      ret[parseInt(item[1])] = item[0];
    });

    return ret;
  }

  // 匹配当前 dpi 下图片对应地址
  function _matchImg(srcList, ra) {
    while(ra >= 0) {
      if (srcList[ra]) {
        return srcList[ra];
      }
      --ra;
    }

    return false;
  }

  // 异步加载预存在数组的可见图片，返回剩余的图片
  function _loadImg(preload) {
    if (!preload || !preload.length) return;

    return $.grep(preload, function(item, i) {
      return _isVisible(item[0], item[1]);
    }, true);
  }

  // 判断图片元素是否在视线内，视线内则加载
  function _isVisible($el, url) {
    var elOffset = $el.offset()
      , elTop = elOffset.top
      , elBottom = elTop + $el.height()
      , $win = $(window)
      , scrollTop = $win.scrollTop()
      , scrollBottom = scrollTop + $win.height();

    if (elTop < scrollTop && elBottom < scrollTop) return false;
    if (elTop > scrollBottom && elBottom > scrollTop) return false;

    $el.attr('src', url);
    return true;
  }

  $.fn.srcset = function(opt) {
    var preload = [];
    // preload[0]: $dom; preload[1]: imgsrc 

    opt = $.extend({
      lazyload: true
    }, opt);

    if (hasSrcset) return;

    if (opt.lazyload) {
      $(window).on('scroll', function() {
        preload = _loadImg(preload);
      });
    }

    return $(this).each(function(index, el) {
      var $el = $(el)
        , srcset = $el.attr('srcset')
        , srcList = _parse(srcset)
        , imgsrc = _matchImg(srcList, ratio);

      
      if (!opt.lazyload) {
        $el.attr('src', imgsrc);
        return;
      }

      preload.push([$el, imgsrc]);
      preload = _loadImg(preload);
    });
  }
}(jQuery);

