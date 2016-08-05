(function() {
  'use strict';
  var versions = [];
  // check that we got a jQuery
  if (typeof window.jQuery == 'function') {
    versions.push(window.jQuery.fn.jquery);
    var old = window.jQuery;
    while (old.fn && old.fn.jquery) {
      old = window.jQuery.noConflict(true);
      if ((!window.jQuery) || (!window.jQuery.fn)) break;
      if (old.fn.jquery === window.jQuery.fn.jquery) {
        break;
      }
      versions.push(window.jQuery.fn.jquery);
    }
  }

  // TODO also add check for jQuery version. If we have a really old version (1 year old?) then show it!

  return {
    id: 'jquery',
    title: '避免使用多个JQuery版本',
    description: '在同一页面使用多个版本的JQuery会导致额外下载大量的数据，清理代码并仅是有一个版本。',
    advice: versions.length > 1 ? '该页面有 ' + versions.length + '个版本的jQuery！你只需要一个版本，请移除没必要的版本。'  : '',
    score: versions.length > 1 ? 0 : 100 ,
    weight: 4,
    offending: versions,
    tags: ['jQuery', 'performance']
  };

})();
