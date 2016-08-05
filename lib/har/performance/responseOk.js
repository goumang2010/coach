'use strict';

module.exports = {
  id: 'responseOk',
  title: '避免丢失和失败的请求',
  description: '页面请求资源不应返回400或500错误。这些失败的请求不应被缓存，否则浏览器每次都会这样做。如果这种情况发生了，表示有东西损坏了，应及时修复。',
  weight: 7,
  tags: ['performance','server'],

  processPage: function(page) {
    let score = 100;
    let offending = [];
    let offendingCodes = {};
    let advice = '';
    page.assets.forEach(function(asset) {
      if (asset.status >= 400) {
        offending.push(asset.url);
        score -= 10;
        if (offendingCodes[asset.status]) {
          offendingCodes[asset.status] += 1;
        } else {
          offendingCodes[asset.status] = 1;
        }
      }
    });

    if (score < 100) {
      advice = '该页面有 ' + offending.length + ' 个失败的请求。';
      Object.keys(offendingCodes).forEach(function(errorCode) {
        advice += '这个页面有 ' + offendingCodes[errorCode] + ' 个失败的请求，请求代码为' + errorCode + '。';
      });
    }

    return {
      score: Math.max(0, score),
      offending: offending,
      advice: advice
    }
  }
};
