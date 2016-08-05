(function() {
  'use strict';
  var url = document.URL;
  var score = 100;
  var message = '';
  if (url.indexOf('https://') === -1) {
    score = 0;
    message = '注意！该页面没有使用HTTPS。每一个未加密的HTTP请求都将暴露用户的操作信息，详情请查看： https://https.cio.gov/everything/. 你可以从https://letsencrypt.org/得到免费的 SSL/TLC 证书。';
  }

  return {
    id: 'https',
    title: '使用更安全的https',
    description: '页面应该总是使用HTTPS ( https://https.cio.gov/everything/)。 HTTP/2也需要使用它! 你可以从https://letsencrypt.org/得到免费的 SSL/TLC 证书。',
    advice: message,
    score: score,
    weight: 10,
    offending: [],
    tags: ['bestpractice']
  };
})();
