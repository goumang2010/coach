(function() {
  'use strict';
  var doWeUseUserTimingAPI = false;
  var message = '开始使用Timing API来测量网站指定的或常规的指标。';
  if (window.performance && window.performance.getEntriesByType) {
    if (window.performance.getEntriesByType('measure').length > 0 ||
      window.performance.getEntriesByType('mark').length > 0) {
      doWeUseUserTimingAPI = true;
      message = '';
    }
  } else {
    message = 'NOTE: 浏览器不支持User timing';
  }

  return {
    id: 'userTiming',
    title: '使用User Timing API 来检查性能',
    description: 'User Timing API是一个完美的方法来测量网站指定的或常规的指标。',
    advice: message,
    score: doWeUseUserTimingAPI ? 100 : 0,
    weight: 1,
    offending: [],
    tags: ['performance']
  };
})();
