(function() {
  'use strict';
  var score = 100;
  var message = '';
  var url = document.URL;

  // ok all Java lovers, please do not use the sessionid in your URLS
  if (url.indexOf('?') > -1 && (url.indexOf('jsessionid') > url.indexOf('?'))) {
    score = 0;
    message = '该页面将用户的session id作为参数了，请修改它，使其通过cookies来处理session。 ';
  }

  var parameters = (url.match(/&/g) || []).length;
  if (parameters > 1) {
    score -= 50;
    message += '该页面有两个以上的请求参数。你应该重新考虑，减少请求参数。 ';
  }

  if (url.length > 100) {
    score -= 10;
    message += '该URL有 ' + url.length + '个字符长，请使它小于100个字符。'
  }

  if (url.indexOf(' ') > -1 || url.indexOf('%20') > -1) {
    score -= 10;
    message += '避免URL中含有空格，使用连字符或下划线代替。 '
  }

  return {
    id: 'url',
    title: '良好的url格式',
    description: '一个干净的url对用户和SEO会更友好。让url可读， 避免url过长、url中有空格、过多的请求参数,并且不要在url中加入session id。',
    advice: message,
    score: score<0 ? 0 : score,
    weight: 2,
    offending: [],
    tags: ['bestpractice']
  };
})();
