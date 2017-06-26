/**
 * 当容器出现在视窗内时再执行方法，依赖jQuery
 *
 * @version 1.0
 * @author liuchun on 2017/06/20
 * @example:
 *
 */
  var lazyFn = {
    fns: [], // 存放要执行的方法
    lazyLoadClass: 'lazyLoad',
    lazyLoadDataName: 'lazyLoadFns',
    init: function () {
      var self = this;
      var timestamp;
      var lazyLoadDataName = self.lazyLoadDataName;
      var lazyLoadClass = self.lazyLoadClass;

      $(document).on('scroll', function (e) {
        timestamp = e.timeStamp;
        setTimeout(function () {
          if (timestamp == e.timeStamp) {
            $.each($('.' + lazyLoadClass), function (i, ele) {
              if (self.inView(ele)) {
                var fns = $(ele).data(lazyLoadDataName);
                if (fns) {
                  fns = fns.split(',');
                  $.each(fns, function (i, fn) {
                    if (fn != '' && self.fns[fn] && !self.fns[fn].executed) {
                      self.runFn(ele, self.fns[fn]);
                      self.fns[fn].executed = true;
                    }
                  });
                }
                $(ele).removeClass(lazyLoadClass).data(lazyLoadDataName, '');
              }
            });
          }
        }, 200);//延迟200毫秒
      })
    },
    // 判断是否在视窗内
    inView: function (ele) {
      if (ele && $(ele).length) {
        var viewportHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var eleTop = $(ele).offset().top;
        var eleBottom = eleTop + $(ele).outerHeight();
        return (eleTop >= scrollTop && eleTop <= (viewportHeight + scrollTop)) || (eleTop <= scrollTop && eleBottom >= scrollTop);
      }
      return false;
    },
    // 执行方法
    runFn: function (ele, fn) {
      fn.fn.apply(null, [ele, fn.params]);
      // syncQueue.addSyncTask(fn);
    },
    // 添加懒执行方法 ele为容器 fn为执行方法,params为执行参数
    add: function (ele, fn, params) {
      if (ele && $(ele).length && fn) {
        var lazyLoadDataName = this.lazyLoadDataName;
        var lazyLoadClass = this.lazyLoadClass;
        var fns = $(ele).addClass(lazyLoadClass).data(lazyLoadDataName);
        fns = fns ? fns.split(',') : [];
        var fnIndex = this.fns.push({
            fn: fn,
            params: params,
            executed: false
          }) - 1;
        fns.push(fnIndex);
        $(ele).data(lazyLoadDataName, fns.join(','));
      }
    }

  };
