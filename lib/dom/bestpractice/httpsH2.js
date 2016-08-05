(function() {
  'use strict';
  var url = document.URL;
  var connectionType = util.getConnectionType();
  var score = 100;
  var message = '';
  if (url.indexOf('https://') > -1 && connectionType.indexOf('h2') === -1)  {
    score = 0;
    message = '该页面使用HTTPS的同时没有使用HTTP/2。 转到http2以满足最佳实践并且使站点更快。';
  }

  return {
    id: 'httpsH2',
    title: '使用 HTTP/2',
    description: '结合使用 HTTP/2 及 HTTPS 是一项新的最佳实践。 使用HTTPS的同时应该也使用HTTP/2。',
    advice: message,
    score: score,
    weight: 2,
    offending: [],
    tags: ['bestpractice']
  };
})();
