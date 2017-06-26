# lazyFn
滚动页面，出现某个元素时才执行绑定的方法

# 用法
```javascript
// init
lazyFn.init();

var params = {a:1};
lazyLoadFn.add($('.accountList'), anyFn, params);

function anyFn(container, params) {
  console.log(params.a);
}
```
