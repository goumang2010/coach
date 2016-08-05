(function(util) {
  'use strict';

  var metas = Array.prototype.slice.call(document.querySelectorAll('meta[name][content]'));
  metas = metas.filter(util.caseInsensitiveAttributeValueFilter('name', 'viewport'));

  var score = 100;
  var offending = [];
  metas.forEach(function(meta) {
    if (meta.content.indexOf('user-scalable=no') > -1 || meta.content.indexOf('initial-scale=1.0; maximum-scale=1.0') > -1) {
      score = 0;
      offending.push(meta.content);
    }
  });

  return {
    id: 'neverSuppressZoom',
    title: '不要禁止触摸缩放',
    description: '移动浏览的一个关键特性就是可以放大阅读内容，缩小定位内容。http://www.iheni.com/mobile-accessibility-tip-dont-suppress-pinch-zoom/',
    advice: score === 0 ? '注意！页面已禁用缩放，你不应该这样做。' : '',
    score: score,
    weight: 8,
    offending: offending,
    tags: ['accessibility']
  };

})(util);
