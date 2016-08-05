(function() {
  'use strict';
  var max = 60;
  var score = 100;
  var message = '';
  var title = document.title;
  if (title.length === 0) {
    message = '页面没有标题.';
    score = 0;

  } else if (title.length > max) {
    message = '标题过长，超出 ' + (title.length - max) + ' 个字符。推荐最大字符数为 ' + max;
    score = 50;
  }

  return {
    id: 'pageTitle',
    title: '页面标题',
    description: '使用标题来使页面对搜索引擎友好。',
    advice: message,
    score: score,
    weight: 5,
    offending: [],
    tags: ['bestpractice']
  };
})();
