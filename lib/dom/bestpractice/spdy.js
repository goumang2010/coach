(function() {
  'use strict';
  var connectionType = util.getConnectionType();
  var score = 100;
  var message = '';
  if (connectionType.indexOf('spdy') !== -1) {
    score = 0;
    message = '该页面正在使用 SPDY。Chrome 在51版本已放弃支持，请尽快迁移到 HTTP/2 。';
  }

  return {
    id: 'spdy',
    title: 'Chrome不再支持SPDY',
    description: 'Chrome 在51版本已放弃支持，请尽快迁移到 HTTP/2 。该页面有更多的用户 (浏览器) 支持 HTTP/2 而非 SPDY。',
    advice: message,
    score: score,
    weight: 1,
    offending: [],
    tags: ['bestpractice']
  };
})();
